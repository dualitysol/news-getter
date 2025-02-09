import { newsSortByPublishedAt, getComparableHash, formatDate, isIdExists } from '../utils'
import * as params from '../params'
import { newsApiKey, newsApiUrl } from '../constants'
import Microservice from '../../../package/Microservice'
import { plainToInstance } from '../../../utils'
import { GetAddressInfoResponseDTO } from '../dto/getAddressInfoResponse.dto'
import { GetAddressInfoRequestDTO } from '../dto/getAddressInfoRequest.dto'
import { inject } from '../../../package/inversify'
import tokens from '../../../di/tokens'
import { Logger } from '../../../logger'
import { AddressLookupError } from '../errors'
import { CustomServerError } from '../../../package/errors'

export class AddressService extends Microservice {
  #logger = new Logger('AddressService')
  /** @type { import('../../Storage/model/index').Storage } */
  #storageService 
  /** @type {import('../../../externals/gateways/ipwhois').IpwhoisGateway} */
  #ipWhoisService

  constructor(
    storageService,
    ipWhoisService,
  ) {
    this.#storageService = storageService
    this.#ipWhoisService = ipWhoisService
  }
  /**
   * @param {GetAddressInfoRequestDTO} params 
   * @returns {GetAddressInfoResponseDTO}
   */
  async lookup(params) {
    try {
      const identificator = getComparableHash(params.address)
      const saved = await this.#storageService.getContent(identificator)

      if (saved) return plainToInstance(GetAddressInfoResponseDTO, saved)

      const rawData = await this.getContentFromAPi(params)
      const result = await this.syncLocalContent({ ...rawData, hash: identificator })

      return plainToInstance(GetAddressInfoResponseDTO, result)
    } catch (error) {
      if (error instanceof CustomServerError) throw error

      this.#logger.error('Error while getting address info', params.address, JSON.stringify(error))
      throw new AddressLookupError(params.address, _, error.stack)
    }
  }
  /**
   * @param {GetAddressInfoResponseDTO & {hash: string}} payload 
   * @returns {GetAddressInfoResponseDTO & {hash: string}}
   */
  async syncLocalContent(payload) {
    try {
      return this.#storageService.saveContent(payload)
    } catch ({ message, stack }) {
      this.#logger.error(`Error while syncing local content: ${JSON.stringify({ message, stack })}`)
      throw new AddressLookupError(payload.ip, 'Error while syncing local content for address', stack)
    }
  }
  /** @param {GetAddressInfoRequestDTO} params */
  async getContentFromAPi(params) {
    try {
      const data = await this.#ipWhoisService.lookup(params.address)
      return data
    } catch ({ message, stack }) {
      this.#logger.error(`Error getting content from external API: ${JSON.stringify({ message, stack })}`)
      throw new AddressLookupError(params.address, `Error getting content from external API by address`, stack)
    }
  }
}

export default AddressService
import { HttpClient } from "../../clients"
import { Logger } from '../../../logger'

export class IpwhoisGateway { 
  /** @type {HttpClient} */
  #client
  #logger = new Logger('IpWhois Gateway')
  /**
   * @param {HttpClient} httpClient
   */
  constructor(httpClient) {
    this.#client = httpClient
  }
  /**
   * @import AddressInfoDTO from "./dto/addressInfo.dto"
   * Gets lookup data for provided ip address
   * @param {string} address 
   * @return {AddressInfoDTO}
   */
  async lookup(address) {
    try {
      this.#logger.info('requesting lookup data for', address)

      const { data } = await this.#client.get(`/${address}`)

      return data
    } catch (error) {
      this.#logger.error('Error while getting lookup data for', address)

      throw error
    }
  }
}
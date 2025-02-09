import Logger from "../logger"

/** @import { AddressService } from '../src/Address/model/index' */
/** @import { Storage } from '../src/Storage/model/index' */

export class Microservice {
  /**
   * @param {Object} param0 
   * @param {*} param0.repository 
   * @param {Logger} param0.logger 
   * @param {{AddressService: AddressService, Storage: Storage}} param0.services 
   */
  constructor ({ repository, logger, services }) {
    this.repository = repository
    this.logger = logger
    /** @type {{AddressService: AddressService, Storage: Storage}} */
    this.services = services
  }
}

export default Microservice
import { CustomServerError } from '../../package/errors'

export class AddressLookupError extends CustomServerError {
  constructor(address, message = 'Error while trying to get lookup data for address', stack) {
    this.status = 500

    if (stack) this.stack = stack

    this.message = `${message} ${address}`
  }
}
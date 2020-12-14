export default class Microservice {
  constructor ({ repository, logger, request, services }) {
    this.repository = repository
    this.logger = logger
    this.services = services
    this.request = request
  }
}

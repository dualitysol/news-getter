import actions from './actions'
import * as params from './params'
import Microservice from '../../package/Microservice'

export class Storage extends Microservice {
  constructor(dependencies) {
    super(dependencies)
  }

  async saveContent({ name, content }) {
    try {
      await this.repository.write({ name, content })
      return this.repository.read({ name })
    } catch ({ message, stack }) {
      this.logger.error(`Error while writting content: ${JSON.stringify({ message, stack })}`)
      throw new Error('Error while writting content')
    }
  }

  getContent({ name }) {
    try {
      return this.repository.read({ name })
    } catch ({ message, stack }) {
      this.logger.error(`Error while getting content: ${JSON.stringify({ message, stack })}`)
      throw new Error('Error while getting content')
    }
  }
}
 export default Storage
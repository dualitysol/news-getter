import dotenv from 'dotenv'

class ConfigBuilder {
  /** @type {number} */
  PORT
  /** @type {string} */
  IPWHOIS_API_URL

  constructor() {
    const config = dotenv.config()

    if (config.error) {
      throw new Error('ERROR WHILE PARSING ENV PARAMETERS')
    }

    const env = process.env

    this.PORT = env.PORT || 3000
    this.IPWHOIS_API_URL = env.IPWHOIS_API_URL
  }
}

export const Config = new ConfigBuilder()
export default Config
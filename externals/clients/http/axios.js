import { HttpClient } from "./http"
import { HTTP_METHODS } from "./constants"
import axios from 'axios'

export class AxiosHttpClient extends HttpClient {
  #axios = axios
  /** @type {string} */
  #baseUrl
  /** @param {string} baseUrl basic link for client instance */
  constructor(baseUrl) {
    super(baseUrl)
    this.#baseUrl = baseUrl
  }
  /**
   * THis is http request method
   * @param {keyof HTTP_METHODS} method 
   * @param {string} url 
   * @param {any} payload body for POST, PUT and PATCH methods
   * @return {Promise<{data: any, status: number, statusText: string, headers: Record<string, any>}>}
   */
  async request(method, url, payload = {}) {
    return this.#axios[method](this.#baseUrl + url, payload)
  }
}
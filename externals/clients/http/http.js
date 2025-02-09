import { HTTP_METHODS } from "./constants";

/**
 * @abstract
 */
export class HttpClient {
  /** @type {string} */
  #baseUrl
  /** @param {string} baseUrl basic link for client instance */
  constructor(baseUrl) {
    this.#baseUrl = baseUrl
  }
  /**
   * THis is http request method
   * @param {keyof HTTP_METHODS} method 
   * @param {string} url 
   * @param {any} payload body for POST, PUT and PATCH methods
   * @return {Promise<{data: any, status: number, statusText: string, headers: Record<string, any>}>}
   */
  async request(method, url, payload) {

  }
  /**
   * http GET method
   * @param {string} url
   */
  async get(url) {
    return this.request(HTTP_METHODS.GET, url)
  }
  /**
   * http POST method
   * @param {string} url
   * @param {any} payload body for POST
   */
  async post(url, payload) {
    return this.request(HTTP_METHODS.POST, url, payload)
  }
}
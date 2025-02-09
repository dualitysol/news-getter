import express from 'express'
import Microservice from '../../package/Microservice'

class Router {
  #router = express()
  /** @type {Record<string, [Microservice, Record<string, Function>]} */
  #services
  /**
   * @param {{ path: string, handler: { service: string, action: string }, method: string, status: number }} routes 
   * @param {Record<string, [Microservice, Record<string, Function>]} services 
   */
  constructor(routes, services) {
    this.#services = services

    for (const route in routes) this.initRoute(route)
  }

  initRoute({ path, handler, method, status }) {
    /** @type { Record<string, string> } */
    const { service: serviceName, action: actionName } = handler
    /** @type { Microservice } */
    const model = this.#services[serviceName][0]
    /** @type { Record<string, Function | Promise<any> } */
    const actions = this.#services[serviceName][0]
  
    this.#router[method](path, async (req, res) => {
      const params = Object.assign(req.query, req.body)
      const payload = { headers: req.headers, params }
  
      try {
        const result = await actions[actionName].call(model, payload)
    
        res.status(status || 200).json(result)
      } catch (error) {
        res.status(error.status || 500).json({
          message: error.message,
          error,
        })
      }
    })
  }
}
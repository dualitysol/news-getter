import express from 'express'
import bodyParser from 'body-parser'
import { Server } from '../baseServer';

const allowHeaders = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-type, Accept, Authorization'
  );
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'HEAD, GET')
    return res.status(200).json({})
  }
  next()
}
const anyKindError = (error, req, res, next) => {
  res.status(error.status || 500)
  res.json({ error: { message: error.message } })
}

export class ExpressServer extends Server {
  #app = express()
  /** @param {number} port */
  constructor(port) {
    super(port)
  }

  init() {
    this.#app.use(bodyParser.urlencoded({ extended: true }))
    this.#app.use(bodyParser.json())
    this.#app.use(allowHeaders)
    this.#app.use(anyKindError)
    this.#app.use(router)
    this.#app.listen(port, () => {
      console.log(`🚀`, 'App started on port:', this.port)
    })
  }
}
export default ExpressServer
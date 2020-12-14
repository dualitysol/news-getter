import express from 'express'
import bodyParser from 'body-parser'
import { config } from 'dotenv'
import routes from './routes'
import repository from './repository'
import axios from 'axios'
import { getModels } from './package/utils'

config()

const port = process.env.PORT || 3000
const app = express()
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
const startApp = async (msg) => {
  const models = await getModels('./src')
  const logger = {
    info: args => console.log('INFO', args),
    warn: args => console.log('WARN', args),
    error: args => console.log('ERROR', args),
    debug: args => console.log('DEBUG', args)
  }
  const validator = { applySchema: _ => true, validate: _ => true }
  const mainDeps = { repository, logger, validator, request: axios }
  const services = new Proxy(models, {
    get: (target, serviceName) => new target[serviceName]({ ...mainDeps, services }),
    set: _ => new Error('Denied to change services')
  })
  const router = await routes(services)
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json())
  app.use(allowHeaders)
  app.use(anyKindError)
  app.use(router)
  app.listen(port, () => {
    console.log(`🚀`, msg)
  })
}

startApp(`News app started on port: ${port}`)


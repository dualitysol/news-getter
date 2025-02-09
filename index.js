import routes from './routes'
import repository from './repository'
import axios from 'axios'
import { getModels } from './package/utils'
import { startServer } from './server'
import { Logger } from './logger'

config()

const startApp = async (msg) => {
  const models = await getModels('./src')
  const logger = new Logger()
  const validator = { applySchema: _ => true, validate: _ => true }
  const mainDeps = { repository, logger, validator, request: axios }
  const services = new Proxy(models, {
    get: (target, serviceName) => new target[serviceName][0]({ ...mainDeps, services }),
    set: _ => new Error('Denied to change services')
  })
  const router = await routes(services)

  startServer(router, msg)
}

startApp(`News app started on port: ${port}`)


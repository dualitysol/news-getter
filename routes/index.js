import express from 'express'
import { readFile } from 'fs'

const router = express()
const getRoutesConfig = (configPath = './routes/routes.json') => new Promise((resolve, reject) => readFile(configPath, 'utf8', (err, data) => {
  if (err) reject(err)
  resolve(JSON.parse(data))
}))
const initRoute = (router, services) => ({ path, handler, method }) => {
  const { service, action } = handler
  router[method](path, services[service].actions[action])
}
export default async services => {
  const { routes } = await getRoutesConfig()
  routes.forEach(initRoute(router, services))
  return router
}

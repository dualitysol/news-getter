import { readFile } from 'fs'

const getRoutesConfig = (configPath = './routes/routes.json') => new Promise(
  (resolve, reject) => readFile(configPath, 'utf8', (err, data) => {
    if (err) reject(err)

    resolve(JSON.parse(data))
  })
)

export default async services => {
  const router = express()
  const { routes } = await getRoutesConfig()

  routes.forEach(initRoute(router, services))

  return router
}

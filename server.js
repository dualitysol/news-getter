import express from 'express'
import bodyParser from 'body-parser'

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
/**
 * @param { Express } router 
 */
export const startServer = router => {
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json())
  app.use(allowHeaders)
  app.use(anyKindError)
  app.use(router)
  app.listen(port, () => {
    console.log(`🚀`, msg)
  })
}
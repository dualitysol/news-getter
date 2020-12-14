import fs from 'fs'

export const listLocalServices = (path = '../src') => new Promise((resolve, reject) => fs.readdir(path, (err, data) => {
  if (!!err) reject(err)
  resolve(data)
}))
export const getModel = name => {
  const servicePath = `../src/${name}/`
  const Model = require(servicePath).default
  return [name, Model]
}
export const getModels = async path => {
  const serviceList = await listLocalServices(path)
  const importedModels = serviceList.map(getModel)
  return Object.fromEntries(importedModels)
}

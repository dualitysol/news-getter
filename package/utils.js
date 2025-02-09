import fs from 'fs'
import Microservice from './Microservice'

export const listLocalServices = (path = '../src') => new Promise(
  (resolve, reject) => fs.readdir(path, (err, data) => {
    if (!!err) reject(err)
    resolve(data)
  })
)
/**
 * @param { string } name 
 * @returns { [string, Microservice, Record<string, Function>] } 
 */
export const getModel = name => {
  const servicePath = `../src/${name}/`
  const service = require(servicePath)

  return [name, service.Model, service.actions]
}
/**
 * @param {string} path 
 * @returns { Record<string, [Microservice, Record<string, Function>]}
 */
export const getModels = async path => {
  const serviceList = await listLocalServices(path)
  const importedModels = serviceList.map(getModel)
  return Object.fromEntries(importedModels)
}

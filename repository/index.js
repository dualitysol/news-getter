import { readFile, writeFile } from 'fs'
import { localPath } from './constants'

const filePathFactory = (path, name) => `${path}/${name}.json`

export default {
  write: ({ name, content, options }) => new Promise((resolve, reject) => {
    writeFile(filePathFactory(localPath, name), JSON.stringify(content), { overwrite: true }, (err, data) => {
      if (err) {
        console.log('Error writting local file', err)
        reject(new Error('Error writting file'))
      }
      resolve(true)
    })
  }),

  read: ({ name, options }) => new Promise((resolve, reject) => {
    readFile(filePathFactory(localPath, name), 'utf8', (err, data) => {
      if (err) {
        const { message } = err
        if (message.includes('no such file or directory')) return resolve(undefined)
        console.log('Error reading local file', err)
        return reject(new Error('Error reading file'))
      }
      resolve(JSON.parse(data))
    })
  })
}

import chai from 'chai'
import { articles } from '../mocks/news'
import { stringHashCode } from '../../utils'
import Storage from '../../src/Storage'
import News from '../../src/News'
import { unlink, access, F_OK } from 'fs'
import { config } from 'dotenv'
import { getComparableHash } from '../../src/News/helpers'

config()

const scope = {
  articles: {
    bitcoin: articles
      .filter(({ content }) => !!content)
  }
}
const { expect } = chai
const newsApiUrl = 'http://newsapi.org/v2/everything?q=bitcoin&from=2020-11-09&sortBy=publishedAt&apiKey=56ebe961104d4ef4a60e4586250e11b7'
const logger = {
  info: args => console.log('INFO', args),
  warn: args => console.log('WARN', args),
  error: args => console.log('ERROR', args),
  debug: args => console.log('DEBUG', args)
}
const repository = {
  write: () => true,
  read: ({ name }) => ({ news: scope.articles['bitcoin'].map(article => ({ ...article, id: getComparableHash(article) })) })
}
const request = {
  get: _ => ({ data: { articles, status: 'ok' } })
}
const removeFile = path => new Promise((resolve, reject) => {
  access(path, F_OK, err => {
    if (!!err) resolve(true)
    else unlink(path, err => {
      if (!!err) reject(err)
      resolve(true)
    })
  })
})

describe('Local repository', () => {
  before(async () => {
    await removeFile('./repository/storage/bitcoin.json')
  })
  describe('Write Method', () => {
    it('Writes json file to "./repository/storage"', async () => {
      const rawNews = articles.filter(({ content }) => !!content)
      const news = rawNews.map(article => {
        const { author, title, content } = article
        const payload = !!author && !!title ? title + author : content
        const id = stringHashCode(payload)
        return { ...article, id, timestamp: Date.now() }
      })
      const name = 'bitcoin'
      
      await repository.write({ name, content: { news } })

      const exludeTimestampAndId = doc => delete doc['timestamp'] && delete doc['id'] && doc
      const fileContent = await repository.read({ name })
      const result = fileContent.news.map(exludeTimestampAndId)

      expect(result).to.deep.eq(rawNews)
    })
  })
})

describe('Storage service', () => {
  describe('Save content', () => {
    it('Call repository driver to write data with provided name and content', async () => {
      const name = 'bitcoin'
      const StorageService = new Storage({ repository, logger })
      const rawNews = scope.articles[name]
      const news = rawNews.map(article => {
        const { author, title, content } = article
        const payload = !!author && !!title ? title + author : content
        const id = stringHashCode(payload)
        return { ...article, id, timestamp: Date.now() }
      })
      const content = { news }
      const saved = await StorageService.saveContent({ name, content })
      const exludeTimestampAndId = doc => delete doc['timestamp'] && delete doc['id'] && doc
      const result = saved.news.map(exludeTimestampAndId)

      expect(result).to.deep.eq(rawNews)
    })
  })

  describe('News service', () => {
    describe('Get content from api', () => {
      it('Request fresh data from external api by get request', async () => {
        const NewsService = new News({ logger, request, services: {} })
        const { articles: requestedarticles } = NewsService.getContentFromAPi({ url: newsApiUrl })
        expect(requestedarticles).to.deep.eqls(articles)
      })
    })

    describe('Get latest news', () => {
      it('Saves data from external api and returns the data', async () => {
        const name = 'bitcoin'
        const StorageService = new Storage({ repository, logger })
        const services = { Storage: StorageService }
        const NewsService = new News({ logger, request, services })
        const { news } = await NewsService.getLatestNews({ query: name, limit: 999999, from: 0 })
        expect(news.map(artc => (delete artc.created_at && artc))).eqls(scope.articles[name].map(({ content }) => ({ content })))
      })
    })
  })
})
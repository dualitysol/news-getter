import { newsSortByPublishedAt, getComparableHash, formatDate, isIdExists } from './helpers'
import actions from './actions'
import * as params from './params'
import { newsApiKey, newsApiUrl } from './constants'
import Microservice from '../../package/Microservice'

export default class News extends Microservice {
  constructor (dependencies) {
    super(dependencies)
    this.actions = Object
      .keys(actions)
      .map(action => ({
        [action]: async (req, res) => {
          try {
            const { query, body } = req
            const params = { ...query, ...body }
            return res
              .status(201)
              .json(await actions[action].call(this, { params }))
          } catch (error) {
            return res
              .status(500)
              .json({ error: JSON.stringify(error) })
          }
        }
      }))
      .reduce((p, c) => ({ ...p, ...c }))
    this.params = params
  }

  async getLatestNews ({ query, limit, from }) {
    try {
      const params = {
        apiKey: newsApiKey,
        q: query,
        from: formatDate(from),
        sortBy: 'publishedAt'
      }
      const url = newsApiUrl
      const { articles } = await this.getContentFromAPi({ url, params })
      const name = `${query}_${params.from}`
      const content = articles.filter(({ content }) => !!content)
      const localChanges = await this.syncLocalContent({ content, name })
      const news = localChanges.news
        .sort(newsSortByPublishedAt)
        .map(({ content, created_at }) => ({ content, created_at }))
      const result = { news: !!limit && limit > 0 ? news.slice(0, limit) : news }
      return result
    } catch ({ message, stack }) {
      this.logger.error(`Error getting last news ${JSON.stringify({ message, stack })}`)
      throw new Error('Error getting last news')
    }
  }

  async syncLocalContent ({ name, content }) {
    try {
      const { news: oldContent } = await this.services.Storage.getContent({ name }) || { news: [] }
      const news = content
        .map(article => ({ ...article, id: getComparableHash(article), created_at: Date.now() }))
        .filter(({ id }) => !isIdExists(id, oldContent))
        .concat(oldContent)
      return this.services.Storage.saveContent({ name, content: { news } })
    } catch ({ message, stack }) {
      this.logger.error(`Error while syncing local content: ${JSON.stringify({ message, stack })}`)
      throw new Error('Error while syncing local content')
    }
  }

  async getContentFromAPi ({ url, params }) {
    try {
      const { data } = await this.request.get(url, { params })
      return data
    } catch ({ message, stack }) {
      this.logger.error(`Error getting content from external API: ${JSON.stringify({ message, stack })}`)
      throw new Error(`Error getting content from external API by url ${url}`)
    }
  }
}
import { createHash } from 'crypto'

export const newsSortByPublishedAt = ({ publishedAt: prev }, { publishedAt: curr }) => {
  const prevTimestamp = new Date(prev).getTime()
  const currTimestamp = new Date(curr).getTime()
  return currTimestamp - prevTimestamp
}

export const newsStartedFromFilter = (from = 0) => ({ publishedAt }) => {
  const timestamp = new Date(publishedAt).getTime()
  return timestamp >= from
}

export const formatDate = date => {
  let d = new Date(date)
  let month = '' + (d.getMonth() + 1)
  let day = '' + d.getDate()
  let year = d.getFullYear()
  if (month.length < 2) month = '0' + month
  if (day.length < 2) day = '0' + day
  return [year, month, day].join('-')
}

export const getComparableHash = ({ author, title, content }) => {
  const data = !!author && !!title ? { author, title } : content
  const d = JSON.stringify(data)
  return createHash('md5')
    .update(d)
    .digest("hex".localeCompare)
    .toString()
}

export const isIdExists = (id, array = []) => !!(array.find(({ id: docId }) => docId.toString() === id.toString()))
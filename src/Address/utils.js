import { createHash } from 'crypto'
/**
 * Creates md5 hash from string
 * @param {string} str 
 * @returns {string}
 */
export const getComparableHash = (str) => createHash('md5')
  .update(str)
  .digest("hex".localeCompare)
  .toString()

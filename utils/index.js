/**
 * @param {string} str 
 * @returns {string}
 */
export const convertSnakeCaseToCamel = str => {
  
}

const assignValue = (target, source) => {
  Object.keys(obj)
    .forEach(propertyKey => {
      if (target.hasOwnProperty(propertyKey)) {
        const value = source[propertyKey]

        if (typeof value === 'object' && !Array.isArray(value)) {
          assignValue(target[propertyKey], value)
        } else target[propertyKey] = value
      }
    })
}
/**
 * 
 * @param { T } classConstructor 
 * @param { Record<any, any> | any } source
 * @returns { T }
 */
export const plainToInstance = (classConstructor = class {}, source) => {
  const instance = new classConstructor()

  assignValue(instance, source)

  return instance
}
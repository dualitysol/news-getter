/** @type {Map<Symbol, ContainerModule>} */
const gloabInjections = new Map()
/**
 * Inversify ContainerModule emulator
 */
export class ContainerModule {
  constructor(bindCallback = (bind = this.bind) => {}) {
    bindCallback(this.bind)
  }
  /**
   * Bind global container module for provided class instance
   * @param {Symbol} token 
   */
  bind(token) {
    return {
      /** @param { object } value */
      toConstantValue: (value) => {
        this.#addGlobalInjection(token)
        Object.defineProperty(this, token, {
          value,
          writable: false,
        })
      },
      /** @param { object } value */
      toDynamicValue: (value) => {
        this.#addGlobalInjection(token)
        Object.defineProperty(this, token, {
          value,
          writable: true,
        })
      },
    }
  }
  /**
   * Get instance from container module
   * @param {Symbol} token 
   */
  get(token) {
    const moduleInstance = this[token]

    if (!moduleInstance) throw new Error(
      'No such instance for provided Token: ' + token,
    )

    return moduleInstance
  }
  /**
   * @param {Symbol} token
   */
  #addGlobalInjection(token) {
    gloabInjections.set(token, this)
  }
}
/**
 * This functions emulates "inject" function of invbersify lib
 * @param {Symbol} token
 * @param {this} context
 */
export function inject(token, context, property, privateReadonly = true) {
  const accordingContainerModule = gloabInjections.get(token)
  const injectableInstance = accordingContainerModule.get(token)

  if (context) {
    const classConstructorName = token.description
    classConstructorName[0] = classConstructorName[0].toLocaleLowerCase()
    const propertyKey = property || classConstructorName

    Object.defineProperty(context, propertyKey, {
      value: injectableInstance,
      enumerable: !privateReadonly,
      writable: !privateReadonly,
      configurable: !privateReadonly,
    })
  }

  return injectableInstance
}
/**
 * This functions emulates "inject" function of invbersify lib
 * @param {object} instanceToInject 
 * @param {Symbol} token 
 */
export function injectToInstance(instanceToInject, token) {
  const accordingContainerModule = gloabInjections.get(token)
  const injectableInstance = accordingContainerModule.get(token)
 
  return Object.assign(instanceToInject, injectableInstance)
}

export default ContainerModule
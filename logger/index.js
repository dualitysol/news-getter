import { TAGS_ENUM, CONSOLE_COLORS, TAG_COLORS } from "./constants"

export class Logger {
  constructor(name) {
    if (name) this.name = name
  }

  #log(tag, args) {
    const tagColor = TAG_COLORS[tag]

    if (this.name) {
      args.unshift(`${this.name}:`)
    }

    console.log(
      tagColor,
      tag,
      CONSOLE_COLORS.RESET,
      ...args,
    )
  }

  info(...args) {
    this.#log(TAGS_ENUM.INFO, args)
  }

  warn(...args) {
    this.#log(TAGS_ENUM.WARN, args)
  }

  error(...args) {
    this.#log(TAGS_ENUM.ERROR, args)
  }

  debug(...args) {
    this.#log(TAGS_ENUM.DEBUG, args)
  }
}

export default Logger
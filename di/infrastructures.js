import { ContainerModule } from "../package/inversify"
import tokens from './tokens'
import Config from "../config"
import Server from "../server"

export const Infrastructures = new ContainerModule(bind => {
  bind(tokens.Infrastructures.Server).toConstantValue(
    new Server(Config.PORT),
  )
})
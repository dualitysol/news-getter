import { ContainerModule } from "../package/inversify"
import tokens from './tokens'
import Config from "../config"
import { Model as AddressService } from '../src/Address'

export const Services = new ContainerModule(bind => {
  bind(tokens.Services.AddressService).toConstantValue(
    new AddressService({
      logger: new Logger(),
      
    }),
  )
})
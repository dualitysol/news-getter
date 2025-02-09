import { AxiosHttpClient } from "../externals/clients"
import { IpwhoisGateway } from "../externals/gateways"
import { ContainerModule } from "../package/inversify"
import tokens from './tokens'
import Config from "../config"

export const Gateways = new ContainerModule(bind => {
  bind(tokens.Gateways.IPWhoisService).toConstantValue(
    new IpwhoisGateway(
      new AxiosHttpClient(Config.IPWHOIS_API_URL)
    )
  )
})
export default Gateways
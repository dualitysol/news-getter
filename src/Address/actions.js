import { plainToInstance } from "../../utils"
import { GetAddressInfoRequestDTO } from "./dto/getAddressInfoRequest.dto"

export default {
  lookup({ params }) {
    return this.lookup(plainToInstance(GetAddressInfoRequestDTO, params))
  }
}

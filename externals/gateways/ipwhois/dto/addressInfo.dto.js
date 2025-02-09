import ConnectionDTO from "./connection.dto"
import CurrencyDTO from "./currency.dto"
import FlagDTO from "./flag.dto"
import SecurityDTO from "./security.dto"
import TimezoneDTO from "./timezone.dto"

export class AddressInfoDTO {
  /** @type {String} */
  ip
  /** @type {Boolean} */
  success
  /** @type {String} */
  type
  /** @type {String} */
  continent
  /** @type {String} */
  continent_code
  /** @type {String} */
  country
  /** @type {String} */
  country_code
  /** @type {String} */
  region
  /** @type {String} */
  region_code
  /** @type {String} */
  city
  /** @type {Number} */
  latitude
  /** @type {Number} */
  longitude
  /** @type {Boolean} */
  is_eu
  /** @type {String} */
  postal
  /** @type {String} */
  calling_code
  /** @type {String} */
  capital
  /** @type {String} */
  borders

  /** @type {FlagDTO} */
  flag = new FlagDTO()
  /** @type {ConnectionDTO} */
  connection = new ConnectionDTO()
  /** @type {TimezoneDTO} */
  timezone = new TimezoneDTO()
  /** @type {CurrencyDTO} */
  currency = new CurrencyDTO()
  /** @type {SecurityDTO} */
  security = new SecurityDTO()
}

export default AddressInfoDTO
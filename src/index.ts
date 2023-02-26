import { Logger } from './lib/logger/logger'
import { decrypt, encrypt } from './lib/cryptography'
import { camelToSnake, snakeToCamel, getProperty, stringFormatter } from './lib/transformers'
import { StatusCode } from './lib/custom-error-constants'


export default {
  cryptography: {
    decrypt, encrypt
  },
  Logger,
  transformers: {
    camelToSnake, snakeToCamel, getProperty, stringFormatter
  },
  StatusCode
}
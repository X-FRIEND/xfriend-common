require('dotenv').config()

const { SERVICE = '' } = process.env

module.exports = {
  application: process.env.SERVICE,
  host: process.env.HOST || 'localhost',
  isResponseCompressorActive: process.env.IS_RESPONSE_COMPRESSOR_ACTIVE,
  nodeEnv: process.env.NODE_ENV,
  path: `/api/${SERVICE.replace(/-/g, '')}`,
  port: Number(process.env.PORT) || 3000
}

import crypto from 'crypto'

interface OptionalEncryptConfig {
  algorithm?: string;
  vector?: string
  key?: string;
}

const defaultEncryptConfig: OptionalEncryptConfig = {
  algorithm: 'aes256',
  vector: '1234567890123456789012345678901234567890',
  key: '31460b08fe4f95004617c9d4b5de4ffee0affb43'
}

export function encrypt(text: string, optionalConfig: OptionalEncryptConfig = {}) {
  const cryptoConfig = { ...defaultEncryptConfig, ...optionalConfig }
  const cipher = crypto.createCipher(cryptoConfig.algorithm, cryptoConfig.key);
  const encrypted = cipher.update(text, 'utf8', 'hex') + cipher.final('hex');

  return encrypted;
}

export function decrypt(text: string, optionalConfig: OptionalEncryptConfig = {}) {
  const cryptoConfig = { ...defaultEncryptConfig, ...optionalConfig }
  const decipher = crypto.createDecipher(cryptoConfig.algorithm, cryptoConfig.key);
  const decrypted = decipher.update(text, 'hex', 'utf8') + decipher.final('utf8');

  return decrypted;
}
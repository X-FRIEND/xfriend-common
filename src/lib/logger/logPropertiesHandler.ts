import { encrypt } from '../cryptography';

export class LogPropertiesHandler {
  public static deleteEmptyProperty(obj: any, key: string): void {
    if (!LogPropertiesHandler.isValueValid(obj, key)) {
      delete obj[key];
    }
  }

  public static encryptSensitiveProperty(obj: any, key: string): void {
    const sensitiveProperties = ['cpf', 'cnpj', 'cpf_cnpj'];
    const value = obj[key];
    if (LogPropertiesHandler.isValueValid(obj, key) && sensitiveProperties.includes(key.toLowerCase())) {
      obj[key] = encrypt(value);
    }
  }

  public static isValueValid(obj: any, key: string): boolean {
    const value = obj[key];
    return !['null', null, 'undefined', undefined, ''].includes(value);
  }

  public static handleLogProperties(obj: any): void {
    Object.keys(obj).forEach((key) => {
      LogPropertiesHandler.deleteEmptyProperty(obj, key);
    });
    
    if (obj.body) {
      Object.keys(obj.body).forEach((key) => {
        LogPropertiesHandler.deleteEmptyProperty(obj.body, key);
        LogPropertiesHandler.encryptSensitiveProperty(obj.body, key);
      });
    }
  }
}
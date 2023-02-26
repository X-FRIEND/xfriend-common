import { LogPropertiesHandler } from './logPropertiesHandler';
import { encrypt } from '../cryptography';

jest.mock('../cryptography');

describe('LogPropertiesHandler', () => {

  afterEach(() => {
    jest.resetAllMocks()
  })

  describe('deleteEmptyProperty', () => {
    it('should delete property if its value is null', () => {
      const obj = { key: null };
      LogPropertiesHandler.deleteEmptyProperty(obj, 'key');
      expect(obj).toStrictEqual({});
    });

    it('should delete property if its value is undefined', () => {
      const obj = { key: undefined };
      LogPropertiesHandler.deleteEmptyProperty(obj, 'key');
      expect(obj).toStrictEqual({});
    });

    it('should delete property if its value is "null" string', () => {
      const obj = { key: 'null' };
      LogPropertiesHandler.deleteEmptyProperty(obj, 'key');
      expect(obj).toStrictEqual({});
    });

    it('should not delete property if its value is not null, undefined, or "null" string', () => {
      const obj = { key: 'value' };
      LogPropertiesHandler.deleteEmptyProperty(obj, 'key');
      expect(obj).toStrictEqual({ key: 'value' });
    });
  });

  describe('encryptSensitiveProperty', () => {
    it('should encrypt property value if it is a sensitive property', () => {
      const obj = { cpf: '12345678901' };
      //@ts-ignore
      encrypt.mockImplementation((value) => `${value} [encrypted]`)

      LogPropertiesHandler.encryptSensitiveProperty(obj, 'cpf');

      expect(encrypt).toHaveBeenCalledWith('12345678901');
      expect(obj).toStrictEqual({ cpf: '12345678901 [encrypted]' });
    });

    it('should not encrypt property value if it is not a sensitive property', () => {
      const obj = { name: 'John Doe' };

      LogPropertiesHandler.encryptSensitiveProperty(obj, 'name');

      expect(obj).toStrictEqual({ name: 'John Doe' });
      expect(encrypt).not.toHaveBeenCalled();
    });

    it('should not encrypt property value if it is empty', () => {
      const obj = { cpf: '' };
      LogPropertiesHandler.encryptSensitiveProperty(obj, 'cpf');
      expect(obj).toStrictEqual({ cpf: '' });
      expect(encrypt).not.toHaveBeenCalled();
    });
  });

  describe('isValueValid', () => {
    it('should return false if value is null', () => {
      const obj = { key: null };
      const result = LogPropertiesHandler.isValueValid(obj, 'key');

      expect(result).toBeFalsy();
    })

    it('should return false if value is undefined', () => {
      const obj = { key: undefined };
      const result = LogPropertiesHandler.isValueValid(obj, 'key');

      expect(result).toBeFalsy();
    })

    it('should return true if value is not null', () => {
      const obj = { key: 'value' };
      const result = LogPropertiesHandler.isValueValid(obj, 'key');

      expect(result).toBeTruthy();
    })
  })

  describe('handleLogProperties', () => {
    beforeEach(() => {
      jest.spyOn(LogPropertiesHandler, 'deleteEmptyProperty').mockImplementation((obj, key) => {
        if (obj[key] === '') {
          delete obj[key];
        }
      });
      jest.spyOn(LogPropertiesHandler, 'encryptSensitiveProperty').mockImplementation((obj, key) => {
        if (obj[key] === 'sensitive') {
          obj[key] = 'encrypted';
        }
      });
    });
  
    afterEach(() => {
      jest.restoreAllMocks();
    });
  
    it('should delete empty properties', () => {
      const obj = { prop1: 'value1', prop2: '' };

      LogPropertiesHandler.handleLogProperties(obj);

      expect(LogPropertiesHandler.deleteEmptyProperty).toHaveBeenCalledWith(obj, 'prop2');
      expect(obj).toEqual({ prop1: 'value1' });
    });
  
    it('should encrypt sensitive properties', () => {
      const obj = { prop1: 'value1', cpf: 'sensitive', cnpj: 'not-sensitive' };

      LogPropertiesHandler.handleLogProperties({ body: obj });

      expect(LogPropertiesHandler.encryptSensitiveProperty).toHaveBeenCalledWith(obj, 'cpf');
      expect(obj).toEqual({ prop1: 'value1', cpf: 'encrypted', cnpj: 'not-sensitive' });
    });
  
    it('should delete empty and encrypt sensitive properties', () => {
      const obj = { prop1: 'value1', cpf: 'sensitive', prop2: '', cpf_cnpj: 'sensitive' };

      LogPropertiesHandler.handleLogProperties({ body: obj });

      expect(LogPropertiesHandler.deleteEmptyProperty).toHaveBeenCalledWith(obj, 'prop2');
      expect(LogPropertiesHandler.encryptSensitiveProperty).toHaveBeenCalledWith(obj, 'cpf');
      expect(LogPropertiesHandler.encryptSensitiveProperty).toHaveBeenCalledWith(obj, 'cpf_cnpj');
      expect(obj).toEqual({ prop1: 'value1', cpf: 'encrypted', cpf_cnpj: 'encrypted' });
    });
  });

})

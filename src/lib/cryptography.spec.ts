import { encrypt, decrypt } from './cryptography';

describe('Crypto', () => {
  const testString = 'test string';

  const encryptConfig = {
    algorithm: 'aes-256-cbc',
    vector: '1234567890123456789012345678901234567890',
    key: '1234567890123456789012345678901234567890'
  }

  describe('encrypt', () => {
    it('should encrypt a string', () => {
      const encryptedString = encrypt(testString);
      expect(encryptedString).not.toBe(testString);
    });

    it('should encrypt a string with custom encryption config', () => {
      const encryptedString = encrypt(testString, { algorithm: encryptConfig.algorithm, key: encryptConfig.key, vector: encryptConfig.vector });
      expect(encryptedString).not.toBe(testString);
    });
  });

  describe('decrypt', () => {
    it('should decrypt an encrypted string', () => {
      const encryptedString = encrypt(testString);
      const decryptedString = decrypt(encryptedString);
      expect(decryptedString).toBe(testString);
    });

    it('should decrypt an encrypted string with custom decryption config', () => {
      const encryptedString = encrypt(testString, { algorithm: encryptConfig.algorithm, key: encryptConfig.key, vector: encryptConfig.vector });
      const decryptedString = decrypt(encryptedString, { algorithm: encryptConfig.algorithm, key: encryptConfig.key, vector: encryptConfig.vector });
      expect(decryptedString).toBe(testString);
    });
  });
});
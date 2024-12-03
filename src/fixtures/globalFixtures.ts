import { test as baseTest } from '@playwright/test';
import { encryptSecretKey } from '../helpers/encryptionHelper';

// Define un fixture que maneja la clave secreta
type Fixtures = {
  encryptedSecretKey: string;
};

export const test = baseTest.extend<Fixtures>({
  encryptedSecretKey: async ({}, use) => {
    const secretKey = process.env.SECRET_KEY;

    if (!secretKey) {
      throw new Error('La clave secreta no está definida en las variables');
    }

    const encryptedKey = encryptSecretKey(secretKey);
    console.log(`Clave secreta encriptada: ${encryptedKey}`);
    await use(encryptedKey);
  },
});

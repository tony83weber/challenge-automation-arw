import * as crypto from 'crypto';

// Función para encriptar la clave secreta con SHA-256
export const encryptSecretKey = (secret: string): string => {
    return crypto.createHash('sha256').update(secret).digest('hex');
};

import crypto from 'crypto';

function generateSalt(): string {
  return crypto
    .randomBytes(4)
    .toString('hex');
}

function encryptPassword(password: string, salt: string) {
  return crypto
    .createHash('sha256')
    .update(password + salt)
    .digest('hex');
}

export {
  generateSalt,
  encryptPassword
}

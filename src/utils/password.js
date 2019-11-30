const pbkdf2 = require('pbkdf2');
const keygen = require('keygen');

const saltLength = 16;

function saltPassword(salt, password) {
  return pbkdf2.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('base64');
}

function hashPassword(password) {
  const salt = keygen.url(saltLength);
  return {
    salt,
    password: saltPassword(salt, password),
  };
}


module.exports = {
  saltPassword,
  hashPassword,
};

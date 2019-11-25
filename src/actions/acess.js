const keygen = require('keygen');
const pbkdf2 = require('pbkdf2');
const UserModel = require('../models/users');

const saltLength = 16;

class AccessAction {
  async register(data) {
    const userData = { ...data, ...AccessAction.hashPassword(data.password) };
    const user = new UserModel(userData);
    await user.save();
  }

  static hashPassword(password) {
    const salt = keygen.url(saltLength);
    return {
      salt,
      password: AccessAction.saltPassword(salt, password),
    };
  }

  static saltPassword(salt, password) {
    return pbkdf2.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('base64');
  }
}

module.exports = new AccessAction();

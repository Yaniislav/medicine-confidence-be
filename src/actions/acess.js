const jwt = require('jsonwebtoken');
const passport = require('koa-passport');
const _ = require('lodash');
const UserModel = require('../models/users');
const { hashPassword } = require('../utils/password');

const allowedUserData = ['firstName', 'lastName', 'ethAddress', 'role', '_id'];

class AccessAction {
  async register(data) {
    const userIncomingData = { ...data, ...hashPassword(data.password) };
    const user = new UserModel(userIncomingData);

    await user.save();

    const externalUserData = _.pick(user._doc, allowedUserData);
    const token = AccessAction.generateToken(externalUserData);

    return {
      ...externalUserData,
      token: `JWT ${token}`,
    };
  }

  login(ctx, next) {
    return new Promise((resolve, reject) => {
      passport.authenticate('local', (err, user) => {
        if (err || !user) {
          reject(err || 'Login Failed');
        } else {
          const externalUserData = _.pick(user, allowedUserData);
          const token = AccessAction.generateToken(externalUserData);
          resolve({
            ...externalUserData,
            token: `JWT ${token}`,
          });
        }
      })(ctx, next);
    });
  }

  static generateToken(data) {
    return jwt.sign(data, process.env.JWT_SECRET, { expiresIn: '24h' });
  }
}

module.exports = new AccessAction();

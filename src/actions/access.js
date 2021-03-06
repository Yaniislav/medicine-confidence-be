import jwt from 'jsonwebtoken';
import passport from 'koa-passport';
import * as _ from 'lodash';
import UserModal from '../models/user';
import { hashPassword } from '../utils/password';

const allowedUserData = ['firstName', 'lastName', 'ethAddress', 'role', '_id', 'email', 'publicKey', 'dataPublicKey'];

class AccessAction {
  async register(data) {
    const user = await UserModal.create(data);

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
          const error = err || { message: 'Login Failed', status: 401 };
          reject(error);
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

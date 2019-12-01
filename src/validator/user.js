import * as _ from 'lodash';
import mongoose from 'mongoose';
import Joi from 'joi';
import userModel from '../models/user';
import handleErrors from './helpers/handleErrors';

const userFreeData = [
  '_id',
  'email',
  'firstName',
  'lastName',
  'ethAddress',
];

const updateSchema = Joi.object().keys({ 
  email: Joi.string().email().required(), 
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  ethAddress: Joi.string().required(),
});

const schemas = {
  create: updateSchema.keys({
    password: Joi.string().required(),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required().options({ language: { any: { allowOnly: 'must match password' } } }),
  }).unknown(true),
  update: updateSchema.unknown(true),
};

class UserValidate {
  async create(body) {
    try {
      await Joi.validate(body, schemas.create);

      const user = await userModel.findOne({
        $or: [{
          email: body.email,
          isDeleted: false,
        }, {
          ethAddress: body.ethAddress,
          isDeleted: false,
        }],
      });

      if (user) {
        if (user.email === body.email) {
          throw ([{ param: 'email', message: 'There is an existing user connected to this email' }]);
        }

        if (user.ethAddress === body.ethAddress) {
          throw ([{ param: 'ethAddress', message: 'There is an existing user connected to this ethAddress' }]);
        }
      }
    } catch (error) {
      handleErrors(error);
    }

    return body;
  }

  async update(_id, body, freeData = userFreeData) {
    let result = null;

    try {
      Joi.validate(body, schemas.update);

      const userObj = await userModel.findOne({ _id: new mongoose.Types.ObjectId(_id), isDeleted: false });

      if (!userObj) {
        throw ([{ param: '_id', message: 'User not found' }]);
      }

      result = _.pick(body, freeData);
    } catch (error) {
      handleErrors(error);
    }

    return result;
  }

  async delete(_id) {
    try {
      const user = await userModel.findOne({
        _id,
        isDeleted: false,
      });
  
      if (!user) {
        throw ([{ param: '_id', message: 'User not found' }]);
      }
    } catch (error) {
      handleErrors(error);
    }

    return true;
  }
}

export default UserValidate;

export const userValidate = new UserValidate();

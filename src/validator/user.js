import * as _ from 'lodash';
import Joi from 'joi';
import userWrite from '../model/user';

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
  ethAddress: Joi.string().base64().required(),
});

const schemas = {
  create: updateSchema.keys({
    password: Joi.string().required(),
    conformPassword: Joi.string().valid(Joi.ref('password')).required().options({ language: { any: { allowOnly: 'must match password' } } }),
  }),
  update: updateSchema,
};

class UserValidate {
  async create(body) {
    const errorList = Joi.validate(body, schemas.create);

    if (errorList.length) {
      throw (errorList);
    }

    const user = await userWrite.findRow({
      query: {
        email: body.email,
        isDeleted: false,
      },
    });

    if (user && user.email === body.email) {
      throw ([{ param: 'email', message: 'There is an existing user connected to this email' }]);
    }

    return body;
  }

  async update(body, user, freeData = userFreeData) {
    const errorList = Joi.validate(body, schemas.update);

    if (errorList.length) {
      throw (errorList);
    }

    const userObj = await userWrite.findRow({
      query: {
        _id: user._id,
        isDeleted: false,
      },
    });

    if (!userObj) {
      throw ([{ param: 'email', message: 'User not found' }]);
    }

    return _.pick(userObj, freeData);
  }
}

export default UserValidate;

export const userValidate = new UserValidate();

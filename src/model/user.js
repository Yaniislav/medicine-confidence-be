import * as _ from 'lodash';
import crypto from 'crypto';
import db from '../db';

const UserModel = db.getModel('user');
export default UserModel;

UserModel.hashPassword = (password) => {
  const salt = crypto.randomBytes(16).toString('base64');
  return {
    salt,
    password: UserModel.saltPassword(salt, password),
  };
};

UserModel.saltPassword = (salt, password) => crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha1').toString('base64');

UserModel.create = async (data) => {
  try {
    const user = new UserModel(data);

    await user.save();
    return user;
  } catch (err) {
    throw (err);
  }
};

UserModel.update = async ({ query, data, callback }) => {
  const user = await UserModel.updateOne(query, { ...data, updatedAt: new Date() }, callback);

  return user;
};

UserModel.changePassword = async (_id, password) => {
  const data = UserModel.hashPassword(password);

  data.updatedAt = new Date();
  data.accessCode = null;
  data.firstTimeLogin = false;

  const user = await UserModel.updateOne({ _id }, data);

  return user;
};

UserModel.findByEmail = async (email) => {
  try {
    return await UserModel.findOne({ email });
  } catch (err) {
    throw (err);
  }
};

UserModel.markAsDeleted = async (ids) => {
  try {
    return await UserModel.update({ _id: { $in: ids } }, { isDeleted: true });
  } catch (err) {
    throw (err);
  }
};

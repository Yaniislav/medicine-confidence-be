import * as _ from 'lodash';
import mongoose from 'mongoose';
import { hashPassword, saltPassword } from '../utils/password';
import UserSchema from '../db/schemas/user';

const UserModel = mongoose.model('user', UserSchema);
export default UserModel;

UserModel.hashPassword = hashPassword;

UserModel.saltPassword = saltPassword;

UserModel.create = async (data) => {
  try {
    const userData = { ...data, ...UserModel.hashPassword(data.password) };
    const user = new UserModel(userData);

    await user.save();

    return user;
  } catch (err) {
    throw (err);
  }
};

UserModel.update = async (query, data) => {
  const user = await UserModel.updateOne(query, { ...data, updatedAt: new Date() });

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

UserModel.findByEthAddress = async (ethAddress) => {
  try {
    return await UserModel.findOne({ ethAddress });
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

import * as _ from 'lodash';
import mongoose from 'mongoose';
import userModel from '../models/user';

const userFreeData = [
  'createdAt',
  'updatedAt',
  'isDeleted',
  'role',
  '_id',
  'email',
  'firstName',
  'lastName',
  'ethAddress',
  'publicKey',
  'dataPublicKey',
];

class UserAction {
  async create(data) {
    const user = await userModel.create(data);

    return _.pick(user, userFreeData);
  }

  async update(_id, data, filter = userFreeData) {
    await userModel.updateOne({ _id: new mongoose.Types.ObjectId(_id) }, { $set: _.pick(data, userFreeData) });

    const user = await userModel.findById(_id, '-password -salt');

    return _.pick(user, filter);
  }

  async get(filter = null) {
    const users = await userModel.find(filter, '-password -salt');

    return users;
  }

  async findById(_id, filter = userFreeData) {
    const user = await userModel.findById(_id);

    return _.pick(user, filter);
  }

  async findByEthAddress(ethAddress, filter = userFreeData) {
    const user = await userModel.findByEthAddress(ethAddress);

    return _.pick(user, filter);
  }

  async delete(_id) {
    await userModel.remove({ _id });

    return true;
  }

  async markAsDeleted(_id) {
    await userModel.update({ _id }, { $set: { isDeleted: true } });

    return true;
  }
}

export default UserAction;

export const userAction = new UserAction();

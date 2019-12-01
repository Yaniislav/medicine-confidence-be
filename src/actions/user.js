import * as _ from 'lodash';
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
];

class UserAction {
  async create(data) {
    const user = await userModel.create(data);

    return _.pick(user, userFreeData);
  }

  async update(_id, data, filter = userFreeData) {
    await userModel.updateOne({ _id }, { $set: data });

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

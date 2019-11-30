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

  async update(data, filter = userFreeData) {
    await userModel.update({ _id: data._id }, { $set: data });

    const user = await userModel.update({ _id: data._id });

    return _.pick(user, filter);
  }

  async get() {
    const users = await userModel.find(null, '-password -salt');

    return users;
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

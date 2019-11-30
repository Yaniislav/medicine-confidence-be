import * as _ from 'lodash';

import userModel from '../model/user';

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
    const user = await userModel.update({
      query: { _id: data._id },
      data,
    });

    return _.pick(user, filter);
  }
}

export default UserAction;

export const userAction = new UserAction();

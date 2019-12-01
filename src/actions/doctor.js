import * as _ from 'lodash';
import doctorModel from '../models/doctor';
import { userAction } from './user';

const doctorFreeData = [
  'doctorCategoryId',
  'userId',
  '_id',
];

class DoctorAction {
  async create(data) {
    const user = await userAction.create({ ...data, role: 'doctor' });
    const doctorData = { ...data, userId: user._id };
    const doctor = await doctorModel.create(doctorData);

    return { ...user, ..._.pick(doctor, doctorFreeData) };
  }

  async update(_id, data, filter = doctorFreeData) {
    await userAction.update(data.userId, data);
    await doctorModel.updateOne({ _id }, {
      $set: {
        categoryId: data.categoryId,
      },
    });

    const doctor = await this.findById(_id);

    return doctor;
  }

  async findById(_id) {
    const doctors = await doctorModel.aggregate([{
      $match: { _id },
    }, {
      $lookup: {
        from: 'users',
        localField: 'userId',
        foreignField: '_id',
        as: 'user',
      },
    }, {
      $unwind: '$user',
    }, {
      $project: {
        _id: 1,
        userId: 1,
        doctorCategoryId: 1,
        email: '$user.email',
        ethAddress: '$user.ethAddress',
        firstName: '$user.firstName',
        lastName: '$user.lastName',
        createdAt: '$user.createdAt',
        updatedAt: '$user.updatedAt',
      },
    }]);

    return doctors[0];
  }

  async get(categoryId) {
    const doctors = await doctorModel.aggregate([{
      $match: { categoryId },
    }, {
      $lookup: {
        from: 'users',
        localField: 'userId',
        foreignField: '_id',
        as: 'user',
      },
    }, {
      $unwind: '$user',
    }, {
      $project: {
        _id: 1,
        userId: 1,
        doctorCategoryId: 1,
        email: '$user.email',
        ethAddress: '$user.ethAddress',
        firstName: '$user.firstName',
        lastName: '$user.lastName',
        createdAt: '$user.createdAt',
        updatedAt: '$user.updatedAt',
      },
    }]);

    return doctors;
  }

  async delete(id) {
    const doctor = await doctorModel.findByIdAndDelete(id);

    await userAction.delete({ _id: doctor.userId });

    return true;
  }

  async markAsDeleted(_id) {
    await doctorModel.update({ _id }, { $set: { isDeleted: true } });

    return true;
  }
}

export default DoctorAction;

export const doctorAction = new DoctorAction();

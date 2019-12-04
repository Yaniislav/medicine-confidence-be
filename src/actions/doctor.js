import * as _ from 'lodash';
import mongoose from 'mongoose';
import doctorModel from '../models/doctor';
import { userAction } from './user';

const doctorFreeData = [
  'doctorCategoryId',
  'userId',
  '_id',
];

const doctorAggregation = ($match = {}) => [{
  $match,
}, {
  $lookup: {
    from: 'users',
    localField: 'userId',
    foreignField: '_id',
    as: 'user',
  },
}, {
  $lookup: {
    from: 'doctorCategories',
    localField: 'doctorCategoryId',
    foreignField: '_id',
    as: 'doctorCategory',
  },
}, {
  $project: {
    _id: 1,
    userId: 1,
    doctorCategoryId: 1,
    user: { $arrayElemAt: ['$user', 0] },
    doctorCategory: { $arrayElemAt: ['$doctorCategory', 0] },
  },
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
    doctorCategory: '$doctorCategory.title',
  },
}];

class DoctorAction {
  async create(data) {
    const user = await userAction.create({ ...data, role: 'doctor' });
    const doctorData = { ...data, userId: user._id };
    const doctor = await doctorModel.create(doctorData);

    return { ...user, ..._.pick(doctor, doctorFreeData) };
  }

  async update(_id, data) {
    await userAction.update(data.userId, data);
    await doctorModel.updateOne({ _id: new mongoose.Types.ObjectId(_id) }, {
      $set: {
        doctorCategoryId: data.doctorCategoryId,
      },
    });

    const doctor = await this.findById(_id);

    return doctor;
  }

  async findById(_id) {
    const doctor = await doctorModel.aggregate(doctorAggregation({ _id: new mongoose.Types.ObjectId(_id) }));

    return doctor[0];
  }

  async get(categoryId) {
    const doctors = await doctorModel.aggregate(doctorAggregation({ categoryId }));

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

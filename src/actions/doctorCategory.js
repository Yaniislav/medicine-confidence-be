import * as _ from 'lodash';
import doctorCategoryModel from '../models/doctorCategory';

const freeData = [
  'title',
  '_id',
];

class DoctorCategoryAction {
  async create(data) {
    const doctorCategory = await doctorCategoryModel.create(data);

    return _.pick(doctorCategory, freeData);
  }

  async update(data, filter = freeData) {
    await doctorCategoryModel.update({ _id: data._id }, { $set: data });

    const doctorCategory = await doctorCategoryModel.update({ _id: data._id });

    return _.pick(doctorCategory, filter);
  }

  async get(filter = null) {
    const doctorCategories = await doctorCategoryModel.find(filter);

    return doctorCategories;
  }

  async delete(_id) {
    await doctorCategoryModel.remove({ _id });

    return true;
  }
}

export default DoctorCategoryAction;

export const doctorCategoryAction = new DoctorCategoryAction();

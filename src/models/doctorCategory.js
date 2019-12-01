import * as _ from 'lodash';
import mongoose from 'mongoose';
import DoctorCategorySchema from '../db/schemas/doctorCategory';

const DoctorCategoryModel = mongoose.model('doctorCategory', DoctorCategorySchema, 'doctorCategories');
export default DoctorCategoryModel;

DoctorCategoryModel.create = async (data) => {
  try {
    const doctorCategory = new DoctorCategoryModel(data);

    await doctorCategory.save();

    return doctorCategory;
  } catch (err) {
    throw (err);
  }
};

DoctorCategoryModel.update = async (query, data) => {
  const user = await DoctorCategoryModel.updateOne(query, { ...data });

  return user;
};

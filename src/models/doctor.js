import * as _ from 'lodash';
import mongoose from 'mongoose';
import DoctorSchema from '../db/schemas/doctor';

const DoctorModel = mongoose.model('doctor', DoctorSchema);
export default DoctorModel;

DoctorModel.create = async (data) => {
  try {
    const doctor = new DoctorModel(data);

    await doctor.save();

    return doctor;
  } catch (err) {
    throw (err);
  }
};

DoctorModel.update = async (query, data) => {
  const user = await DoctorModel.updateOne(query, { ...data });

  return user;
};

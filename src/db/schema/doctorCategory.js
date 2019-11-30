import { Schema } from 'mongoose';

const DoctorCategory = new Schema({
  title: { type: String, required: true, unique: true },
});

export default DoctorCategory;

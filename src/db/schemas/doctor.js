import { Schema } from 'mongoose';

const Doctor = new Schema({
  userId: { type: Schema.Types.ObjectId, required: true, unique: true },
  doctorCategoryId: { type: Schema.Types.ObjectId, required: true },
  price: { type: Number, default: 0.1 },
});

export default Doctor;

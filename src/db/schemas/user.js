import { Schema } from 'mongoose';
import standardFields from '../standardFields';

const User = new Schema({
  ...standardFields,
  email: { type: String, required: true, trim: true, unique: true },
  lastName: { type: String, required: true },
  firstName: { type: String, required: true },
  salt: String,
  password: String,
  ethAddress: { type: String, required: true },
  role: { type: String, enum: ['admin', 'patient', 'doctor'], default: 'patient' },
});

export default User;

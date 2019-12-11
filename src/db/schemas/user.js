import { Schema } from 'mongoose';
import standardFields from '../standardFields';
import { saltPassword } from '../../utils/password';

const User = new Schema({
  ...standardFields,
  email: {
    type: String, required: true, trim: true, unique: true,
  },
  lastName: { type: String, required: true },
  firstName: { type: String, required: true },
  salt: String,
  password: String,
  ethAddress: { type: String, required: true },
  role: { type: String, enum: ['admin', 'patient', 'doctor'], default: 'patient' },
  publicKey: String,
  dataPublicKey: String
});

User.methods.checkPassword = function (pass) {
  if (!pass) return false;
  if (!this.password) return false; // password hash
  return saltPassword(this.salt, pass) === this.password;
};


export default User;

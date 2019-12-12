import { Schema } from 'mongoose';
import standardFields from '../standardFields';

const Drug = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  ...standardFields,
});

export default Drug;

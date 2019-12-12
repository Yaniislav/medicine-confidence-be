import mongoose from 'mongoose';
import DrugSchema from '../db/schemas/drug';

const DrugModel = mongoose.model('drug', DrugSchema);
export default DrugModel;

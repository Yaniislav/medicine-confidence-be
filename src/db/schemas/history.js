import { Schema } from 'mongoose';

const HistorySchema = new Schema({
  patientId: { type: Schema.Types.ObjectId, required: true },
  doctorId: { type: Schema.Types.ObjectId, required: true },
  encryptedData: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
}, { autoIndex: false });


HistorySchema.index({
  patientId: 1,
  doctorId: 1,
}, { unique: true });


export default HistorySchema;

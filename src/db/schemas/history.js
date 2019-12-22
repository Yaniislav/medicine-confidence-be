import { Schema } from 'mongoose';

const HistorySchema = new Schema({
  patientId: { type: Schema.Types.ObjectId, required: true },
  doctorId: { type: Schema.Types.ObjectId, required: true },
  encryptedData: { type: String, required: true },
  dataLength: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
}, { autoIndex: false });


HistorySchema.index({
  patientId: 1,
  doctorId: 1,
}, { unique: true });


export default HistorySchema;

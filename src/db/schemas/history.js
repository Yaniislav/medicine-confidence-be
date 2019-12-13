import { Schema } from 'mongoose';

const History = new Schema({
  patientId: { type: Schema.Types.ObjectId, required: true },
  doctorId: { type: Schema.Types.ObjectId, required: true },
  encryptedData: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default History;

import { Schema } from 'mongoose';

const Notification = new Schema({
  title: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  sentAt: { type: Date },
  status: { type: String, default: 'pending', enum: ['pending', 'sent'] },
  recipientAddress: { type: String, required: true },
  sourceAddress: { type: String },
  eventName: { type: String },
  eventType: { type: Number },
  eventPayload: { type: String },
  senderId: { type: Schema.Types.ObjectId },
  actionStatus: { type: String, default: 'none', enum: ['none', 'complete'] },
});

export default Notification;

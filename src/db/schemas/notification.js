import { Schema } from 'mongoose';

const Notification = new Schema({
  title: { type: String, required: true },
  message: { type: String, required: true },
  sentAt: { type: Date, default: Date.now },
  status: { type: String, default: 'pending', enum: ['pending', 'sent'] },
  recipientAddress: { type: String, required: true },
});

export default Notification;

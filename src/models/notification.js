import mongoose from 'mongoose';
import NotificationSchema from '../db/schemas/notification';

const NotificationModel = mongoose.model('notification', NotificationSchema);
export default NotificationModel;

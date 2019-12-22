import NotificationModel from '../models/notification';
import { userAction } from './user'
import socket from '../components/socket';

class NotificationAction {
  constructor() {
    socket.onUserConnect(async (recipientAddress) => {
      const notifications = await this.getAll(recipientAddress);

      socket.sendToUser('notifications', recipientAddress, notifications);

    });
  }

  async create(data) {
    const notification = await NotificationModel.create(data);
    if (socket.isOnline(notification.recipientAddress)) {
      socket.sendToUser('notification', notification.recipientAddress, notification);
    }
    return notification;
  }

  async getAll(recipientAddress) {
    const notifications = await NotificationModel.find({
      recipientAddress,
    });
    return notifications;
  }

  async getSent(recipientAddress) {
    const sentNotifications = await NotificationModel.find({
      recipientAddress,
      status: 'sent',
    });
    return sentNotifications;
  }

  async getPending(recipientAddress) {
    const pendingNotifications = await NotificationModel.find({
      recipientAddress,
      status: 'pending',
    });
    return pendingNotifications;
  }

  async markAsSent(recipientAddress, ids) {
    // ids must be an array
    await NotificationModel.update({
      recipientAddress,
      _id: { $in: ids },
    }, { $set: { status: 'sent' } });
  }

  async markActionAsComplete(notificationId) {
    await NotificationModel.update({
      _id: notificationId,
    }, { $set: { actionStatus: 'complete' } });
  }

  async createReadRequestNotification(sourceId, recipientId) {
    const doctor = await userAction.findById(sourceId);
    const patient = await userAction.findById(recipientId);

    const notification = {
      title: 'History read request',
      message: `${doctor.firstName} ${doctor.lastName} wants to read your history of treatment`,
      sentAt: Date.now(),
      recipientAddress: patient.ethAddress,
      sourceAddress: doctor.ethAddress,
      eventName: 'request_read',
      eventType: 0,
      eventPayload: '',
      senderId: doctor._id,
    };

    return this.create(notification);
  }

  async createRequestReadAllowedNotification(sourceId, recipientId) {
    const doctor = await userAction.findById(recipientId);
    const patient = await userAction.findById(sourceId);

    const notification = {
      title: 'History read request allowed',
      message: `${patient.firstName} ${patient.lastName} allowed you to read history of treatment`,
      sentAt: Date.now(),
      recipientAddress: doctor.ethAddress,
      sourceAddress: patient.ethAddress,
      eventName: 'request_read_allowed',
      eventType: 0,
      eventPayload: '',
      senderId: patient._id,
    };

    return this.create(notification);
  }

}

export default NotificationAction;

export const notificationAction = new NotificationAction();


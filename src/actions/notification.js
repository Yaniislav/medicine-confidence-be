import NotificationModel from '../models/notification';

class NotificationAction {
  async create(data) {
    const notification = await NotificationModel.create(data);

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

}

export default NotificationAction;

export const notificationAction = new NotificationAction();


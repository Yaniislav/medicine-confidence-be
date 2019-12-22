import HistoryModel from '../models/history';
import { notificationAction } from './notification';

class HistoryAction {
  async get(patientId, doctorId) {
    const history = await HistoryModel
      .findOne({
        patientId,
        doctorId,
      });
    return history;
  }

  async create(data) {
    const history = await HistoryModel.create(data);
    await notificationAction.createRequestReadAllowedNotification(data.patientId, data.doctorId);
    return history;
  }

  async update(patientId, doctorId, update) {
    const history = await HistoryModel.findOneAndUpdate({
      patientId,
      doctorId,
    }, {
      ...update,
      updatedAt: Date.now(),
    }, { new: true });
    await notificationAction.createRequestReadAllowedNotification(patientId, doctorId);
    return history;
  }
}

export default HistoryAction;
export const historyAction = new HistoryAction();

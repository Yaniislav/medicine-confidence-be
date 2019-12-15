import HistoryModel from '../models/history';

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
    return history;
  }

  async update(patientId, doctorId, update) {
    const history = await HistoryModel.findOneAndUpdate({ patientId, doctorId }, update, { new: true });
    return history;
  }
}

export default HistoryAction;
export const historyAction = new HistoryAction();

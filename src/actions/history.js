import HistoryModel from '../models/history';
import { convertToNumber } from '../utils/convertToNumber';

const defaultLimit = 10;
const maxLimit = 100;
const defaultPage = 1;

class HistoryAction {
  async getPatientHistory(patientId, limitString, pageString) {
    const count = await HistoryModel.count({ patientId });
    const page = convertToNumber(pageString) || defaultPage;
    let limit = convertToNumber(limitString) || defaultLimit;
    if (limit > maxLimit) limit = maxLimit;
    let history = [];
    if (count) {
      history = await HistoryModel
        .find({ patientId })
        .skip((limit * page) - limit)
        .limit(limit);
    }

    return {
      data: history,
      count,
      limit,
      page,
    };
  }

  async create(data) {
    const history = await HistoryModel.create(data);
    return history;
  }
}

export default HistoryAction;
export const historyAction = new HistoryAction();

import mongoose from 'mongoose';
import HistorySchema from '../db/schemas/history';

const HistoryModel = mongoose.model('history', HistorySchema);

HistoryModel.createIndexes();

export default HistoryModel;

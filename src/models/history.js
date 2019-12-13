import mongoose from 'mongoose';
import HistorySchema from '../db/schemas/history';

const HistoryModel = mongoose.model('history', HistorySchema);

export default HistoryModel;

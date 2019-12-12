import DrugModel from '../models/drug';

class DrugAction {
  async getAll() {
    const drugs = await DrugModel.find({ isDeleted: false });
    return drugs;
  }

  async getById(_id) {
    const drug = await DrugModel.findOne({ _id });
    return drug;
  }

  async update(_id, update) {
    const changedDrug = await DrugModel.findOneAndUpdate({ _id }, update, { new: true });
    return changedDrug;
  }

  async create(data) {
    const drug = await DrugModel.create(data);
    return drug;
  }

  async delete(_id) {
    await DrugModel.updateOne({ _id }, { isDeleted: true });
  }
}

export default DrugAction;
export const drugAction = new DrugAction();


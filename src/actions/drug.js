import DrugModel from '../models/drug';

class DrugAction {
  async getAll() {
    const drugs = await DrugModel.find({ isDeleted: false });
    return drugs;
  }

  async getById(id) {
    const drug = await DrugModel.findOne({ _id: id, isDeleted: false });
    return drug;
  }

  async update(id, update) {
    await DrugModel.findOneAndUpdate({ _id: id }, update);
  }

  async create(data) {
    const drug = await DrugModel.create(data);
    return drug;
  }

  async delete(id) {
    await DrugModel.findOneAndUpdate({ _id: id }, { isDeleted: true });
  }
}

export default DrugAction;
export const drugAction = new DrugAction();


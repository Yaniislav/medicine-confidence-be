import * as _ from 'lodash';
import Joi from 'joi';
import doctorCategoryModel from '../models/doctorCategory';
import handleErrors from './helpers/handleErrors';

const doctorCategorySchema = Joi.object().keys({
  title: Joi.string().required(),
});

const schemas = {
  create: doctorCategorySchema,
};

class DoctorCategoryValidate {
  async create(body) {
    try {
      await Joi.validate(body, schemas.create);

      const doctorCategory = await doctorCategoryModel.findOne({ title: body.title });
  
      if (doctorCategory) {
        throw ([{ param: 'title', message: 'Category with this title already exists' }]);
      }
    } catch (error) {
      handleErrors(error);
    }

    return body;
  }

  async update(_id, body) {
    try {
      await Joi.validate(body, schemas.create);
      const doctorCategory = await doctorCategoryModel.findById(_id);
  
      if (!doctorCategory) {
        throw ([{ param: '_id', message: 'Doctor Category not found' }]);
      }
    } catch (error) {
      handleErrors(error);
    }

    return true;
  }

  async delete(_id) {
    try {
      const doctorCategory = await doctorCategoryModel.findById(_id);
  
      if (!doctorCategory) {
        throw ([{ param: '_id', message: 'Doctor Category not found' }]);
      }
    } catch (error) {
      handleErrors(error);
    }

    return true;
  }
}

export default DoctorCategoryValidate;

export const doctorCategoryValidate = new DoctorCategoryValidate();

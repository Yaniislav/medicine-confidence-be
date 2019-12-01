import * as _ from 'lodash';
import Joi from 'joi';
import doctorModel from '../models/doctor';
import doctorCategoryModel from '../models/doctorCategory';
import handleErrors from './helpers/handleErrors';

const doctorSchema = Joi.object().keys({
  doctorCategoryId: Joi.string().regex(/^[0-9a-fA-F]{24}$/, 'valid objectId').required(),
}).unknown(true);

const schemas = {
  create: doctorSchema,
};

class DoctorValidate {
  async create(body) {
    try {
      await Joi.validate(body, schemas.create);

      const doctorCategory = await doctorCategoryModel.findById(body.doctorCategoryId);

      if (!doctorCategory) {
        throw ([{ param: 'doctorCategoryId', message: 'Doctor Category not found' }]);
      }
    } catch (error) {
      handleErrors(error);
    }

    return body;
  }

  async update(_id, body) {
    let result = null;

    try {
      Joi.validate(body, schemas.create);

      const doctor = await doctorModel.findById(_id);

      if (!doctor) {
        throw ([{ param: '_id', message: 'Doctor not found' }]);
      }

      result = doctor.userId;
    } catch (error) {
      handleErrors(error);
    }

    return result;
  }

  async delete(_id) {
    try {
      const doctor = await doctorModel.findOne({ _id });

      if (!doctor) {
        throw ([{ param: '_id', message: 'Doctor not found' }]);
      }
    } catch (error) {
      handleErrors(error);
    }

    return true;
  }
}

export default DoctorValidate;

export const doctorValidate = new DoctorValidate();

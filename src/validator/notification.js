import Joi from 'joi';
import handleErrors from './helpers/handleErrors';

const notificationSchema = Joi.object()
  .keys({
    title: Joi.string()
      .min(3)
      .max(80),
    message: Joi.string()
      .min(3)
      .max(255),
    recipientAddress: Joi.string(), // will be validation for length, eth address should contain 42 symbol
  });

const schemas = {
  create: notificationSchema,
};

class NotificationValidate {
  async create(body) {
    try {
      await Joi.validate(body, schemas.create);

    } catch (error) {
      handleErrors(error);
    }

    return body;
  }


}

export default NotificationValidate;

export const notificationValidate = new NotificationValidate();

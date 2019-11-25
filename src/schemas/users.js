const { Schema } = require('mongoose');
const commonFields = require('./commonFields');

const usersSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  ethAddress: {
    type: String,
    unique: true,
    required: true,
  },
  role: {
    type: String,
    enum: ['Client', 'Doctor'],
    default: 'Client',
  },
  salt: String,
  password: String,
  ...commonFields,
});

module.exports = usersSchema;

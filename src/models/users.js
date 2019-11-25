const { model } = require('mongoose');
const schema = require('../schemas/users');

module.exports = model('User', schema);

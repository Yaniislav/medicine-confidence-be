const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const initDB = async () => {
  try {
    const dbConnectionURL = process.env.DB_CONNECTION_URL;

    await mongoose.connect(dbConnectionURL, { useNewUrlParser: true, useUnifiedTopology: true });

    console.log('Data Base is connected');
  } catch (err) {
    throw err;
  }
};

module.exports = initDB;

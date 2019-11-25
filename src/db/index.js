const { connect } = require('mongoose');

const initDB = async () => {
  try {
    const dbConnectionURL = process.env.DB_CONNECTION_URL;
    await connect(dbConnectionURL, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Data Base is connected');
  } catch (err) {
    throw err;
  }
};

module.exports = initDB;

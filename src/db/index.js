import mongoose, { Schema } from 'mongoose';
import path from 'path';
import fs from 'fs';

class DB {
  constructor() {
    this.db = null;
  }

  async init() {
    try {
      const dbConnectionURL = process.env.DB_CONNECTION_URL;

      this.db = await mongoose.connect(dbConnectionURL, { useNewUrlParser: true, useUnifiedTopology: true });
      console.log('Data Base is connected');

      await this._initModels();
    } catch (err) {
      throw err;
    }
  }

  async _initModels() {
    return new Promise((res, rej) => {
      fs.readdir(path.join(__dirname, './schema'), (err, data) => {
        if (err) rej(err);
        data.forEach((pathStr) => {
          let schema = require(path.join(__dirname, './schema', pathStr));

          if (schema.default) { // es6 export default
            schema = schema.default;
          }

          if (schema instanceof Schema) {
            const model = pathStr.split('/').pop().replace('.js', '');

            this.setModel(model, schema);
          }
        });

        res();
      });
    });
  }

  _checkDB() {
    if (!this.db) {
      throw new Error('Init db first');
    }
  }

  setModel = (model, schema) => {
    this._checkDB();

    this.db[model] = mongoose.model(model, schema);
  }

  getModel = (model) => {
    this._checkDB();

    return this.db[model];
  }
}

export default new DB();

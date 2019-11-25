const Koa = require('koa');
const dotenv = require('dotenv');
const initRoutes = require('./routes');
const initDB = require('./db');

dotenv.config();
initDB();
const app = new Koa();

initRoutes(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT);

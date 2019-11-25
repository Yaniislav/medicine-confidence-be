const Koa = require('koa');
const koaBody = require('koa-body');
const dotenv = require('dotenv');
const initRoutes = require('./routes');
const initDB = require('./db');

dotenv.config();
initDB();
const app = new Koa();

initRoutes(app);
app.use(koaBody());

const PORT = process.env.PORT || 3000;
app.listen(PORT);

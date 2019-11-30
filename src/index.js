const Koa = require('koa');
const koaBody = require('koa-body');
const dotenv = require('dotenv');
const initRoutes = require('./routes');
const initDB = require('./db');
const initPassport = require('./components/passport');

dotenv.config();
initDB();

const app = new Koa();

initPassport(app);
app.use(koaBody());
initRoutes(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT);

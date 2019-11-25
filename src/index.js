const Koa = require('koa');
const initRoutes = require('./routes');

const app = new Koa();

initRoutes(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT);

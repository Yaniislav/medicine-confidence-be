import Koa from 'koa';
import koaBody from 'koa-body';
import dotenv from 'dotenv';
import initRoutes from './routes';
import initDB from './db';
import initPassport from './components/passport';

const start = async () => {
  dotenv.config();
  await initDB();
  const app = new Koa();

  app.use(koaBody());

  initPassport(app);
  initRoutes(app);

  const PORT = process.env.PORT || 3000;
  app.listen(PORT);

  console.log(`Server started on port: ${PORT}`);
};

start();

import Koa from 'koa';
import dotenv from 'dotenv';
import initRoutes from './routes';
import db from './db';

const start = async () => {
  dotenv.config();
  await db.init();
  const app = new Koa();

  initRoutes(app);

  const PORT = process.env.PORT || 3000;
  app.listen(PORT);
};

start();

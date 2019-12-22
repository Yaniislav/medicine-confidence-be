import Koa from 'koa';
import koaBody from 'koa-body';
import cors from 'koa2-cors';
import dotenv from 'dotenv';
import initRoutes from './routes';
import initDB from './db';
import initPassport from './components/passport';
import contractsListener from './components/ethereum';
import contractsEventHandler from './components/contractEventHandler';
import socket from './components/socket';

const start = async () => {
  dotenv.config();
  await initDB();
  const app = new Koa();

  app.use(cors());
  app.use(koaBody());

  initPassport(app);
  initRoutes(app);

  contractsListener.startListening();
  contractsListener.addListener(contractsEventHandler);

  const PORT = process.env.PORT || 3000;
  app.listen(PORT);

  const SOCKET_PORT = process.env.SOCKET_PORT || 3005;

  socket.listen(SOCKET_PORT);

  console.log(`Server started on port: ${PORT}`);
};

start();

import koaRouter from 'koa-router';
import middlewareWrapper from '../components/middlewareWrapper';
import { userAction } from '../actions/user';
import authorization from '../middlewares/authorization';

const patientsRouter = koaRouter({
  prefix: '/patients',
});

patientsRouter.use(authorization);

patientsRouter.get('/', async (ctx, next) => {
  await middlewareWrapper.wrap(ctx, next, async () => {
    const users = await userAction.get();
    const result = users.filter(user => user.role === 'patient');

    return result;
  });
});

export default patientsRouter;
module.exports = patientsRouter;

import koaRouter from 'koa-router';
import middlewareWrapper from '../components/middlewareWrapper';
import authorization from '../middlewares/authorization';
import { historyAction } from '../actions/history';

const historyRouter = koaRouter({ prefix: '/histories' });
historyRouter.use(authorization);

historyRouter.post('/', async (ctx, next) => {
  await middlewareWrapper.wrap(ctx, next, async () => {
    try {
      const data = ctx.request.body;
      const result = await historyAction.create(data);
      return result;
    } catch (e) {
      if (e.code && e.code === 11000) {
        throw { message: 'This record already exists, you should use update' };
      }
    }
  });
});

historyRouter.get('/:patientId/:doctorId', async (ctx, next) => {
  await middlewareWrapper.wrap(ctx, next, async () => {
    const { patientId, doctorId } = ctx.params;
    const result = await historyAction.get(patientId, doctorId);
    return result;
  });
});

historyRouter.put('/:patientId/:doctorId', async (ctx, next) => {
  await middlewareWrapper.wrap(ctx, next, async () => {

    const { patientId, doctorId } = ctx.params;
    const { encryptedData } = ctx.request.body;
    const result = await historyAction.update(patientId, doctorId, { encryptedData });
    return result;
  });
});

module.exports = historyRouter;

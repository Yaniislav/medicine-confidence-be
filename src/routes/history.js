import koaRouter from 'koa-router';
import middlewareWrapper from '../components/middlewareWrapper';
import authorization from '../middlewares/authorization';
import hasRole from '../middlewares/hasRole';
import { historyAction } from '../actions/history';

const historyRouter = koaRouter({ prefix: '/histories' });
historyRouter.use(authorization);

historyRouter.post('/', hasRole('doctor'), async (ctx, next) => {
  await middlewareWrapper.wrap(ctx, next, async () => {
    const data = ctx.request.body;
    const result = await historyAction.create(data);
    return result;
  });
});

historyRouter.get('/:patientId', async (ctx, next) => {
  await middlewareWrapper.wrap(ctx, next, async () => {

    const { patientId } = ctx.params;
    const { limit, page } = ctx.query;
    const result = await historyAction.getPatientHistory(patientId, limit, page);
    return result;
  });
});

export default historyRouter;
module.exports = historyRouter;

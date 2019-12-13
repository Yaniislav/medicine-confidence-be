import koaRouter from 'koa-router';
import middlewareWrapper from '../components/middlewareWrapper';
import authorization from '../middlewares/authorization';
import { notificationAction } from '../actions/notification';

const notificationsRouter = koaRouter({ prefix: '/notifications' });

notificationsRouter.use(authorization);

notificationsRouter.get('/:ethAddress', async (ctx, next) => {
  await middlewareWrapper.wrap(ctx, next, async () => {
    const { ethAddress } = ctx.params;
    const result = await notificationAction.getAll(ethAddress);

    return result;
  });
});

notificationsRouter.get('/pending/:ethAddress', async (ctx, next) => {
  await middlewareWrapper.wrap(ctx, next, async () => {
    const { ethAddress } = ctx.params;
    const result = await notificationAction.getPending(ethAddress);

    return result;
  });
});

notificationsRouter.post('/', async (ctx, next) => {
  await middlewareWrapper.wrap(ctx, next, async () => {
    const result = await notificationAction.create(ctx.request.body);

    return result;
  });
});

notificationsRouter.put('/markRead', async (ctx, next) => {
  await middlewareWrapper.wrap(ctx, next, async () => {
    const { body: { ethAddress, ids } } = ctx.request;
    const result = await notificationAction.markAsSent(ethAddress, ids);

    return result;
  });
});

export default notificationsRouter;
module.exports = notificationsRouter;

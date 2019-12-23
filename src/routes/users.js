import koaRouter from 'koa-router';
import middlewareWrapper from '../components/middlewareWrapper';
import { userAction } from '../actions/user';
import { userValidate } from '../validator/user';
import authorization from '../middlewares/authorization';

const usersRouter = koaRouter({
  prefix: '/users',
});

// usersRouter.use(authorization);

usersRouter.get('/', async (ctx, next) => {
  await middlewareWrapper.wrap(ctx, next, async () => {
    const result = await userAction.get();

    return result;
  });
});

usersRouter.get('/:id', async (ctx, next) => {
  await middlewareWrapper.wrap(ctx, next, async () => {
    const { id } = ctx.params;
    const result = await userAction.findById(id);

    return result;
  });
});

usersRouter.post('/', async (ctx, next) => {
  await middlewareWrapper.wrap(ctx, next, async () => {
    const data = await userValidate.create(ctx.request.body);
    const user = await userAction.create(data);

    return user;
  });
});

usersRouter.put('/:id', async (ctx, next) => {
  await middlewareWrapper.wrap(ctx, next, async () => {
    const { id } = ctx.params;
    const data = await userValidate.update(id, ctx.request.body);
    const result = await userAction.update(id, data);

    return result;
  });
});

usersRouter.delete('/:id', async (ctx, next) => {
  await middlewareWrapper.wrap(ctx, next, async () => {
    const { id } = ctx.params;

    await userValidate.delete(id);

    const result = await userAction.delete();

    return result;
  });
});

usersRouter.get('/getByEthAddresses/:address', async (ctx, next) => {
  await middlewareWrapper.wrap(ctx, next, async () => {
    const { address } = ctx.params;

    const result = await userAction.findByEthAddress(address);

    return result;
  });
});

usersRouter.put('/:id/markAsDeleted', async (ctx, next) => {
  await middlewareWrapper.wrap(ctx, next, async () => {
    const { id } = ctx.params;

    await userValidate.delete(id);

    const result = await userAction.markAsDeleted(id);

    return result;
  });
});

export default usersRouter;
module.exports = usersRouter;

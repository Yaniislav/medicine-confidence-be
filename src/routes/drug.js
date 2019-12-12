import koaRouter from 'koa-router';
import middlewareWrapper from '../components/middlewareWrapper';
import authorization from '../middlewares/authorization';
import { drugAction } from '../actions/drug';

const drugRouter = koaRouter({ prefix: '/drugs' });

drugRouter.use(authorization);

drugRouter.get('/', async (ctx, next) => {
  await middlewareWrapper.wrap(ctx, next, async () => {
    const result = await drugAction.getAll();

    return result;
  });
});

drugRouter.get('/:id', async (ctx, next) => {
  await middlewareWrapper.wrap(ctx, next, async () => {
    const result = await drugAction.getById(ctx.params.id);
    if (!result) {
      throw {
        message: 'Not found',
        param: ctx.params.id,
        status: 404,
      };
    } else {
      return result;
    }
  });
});

drugRouter.post('/', async (ctx, next) => {
  await middlewareWrapper.wrap(ctx, next, async () => {
    const result = await drugAction.create(ctx.request.body);

    return result;
  });
});

drugRouter.put('/:id', async (ctx, next) => {
  await middlewareWrapper.wrap(ctx, next, async () => {
    const { id } = ctx.params;
    const { body } = ctx.request;
    const result = await drugAction.update(id, body);

    return result;
  });
});

drugRouter.delete('/:id', async (ctx, next) => {
  await middlewareWrapper.wrap(ctx, next, async () => {
    const { id } = ctx.params;
    const result = await drugAction.delete(id);

    return result;
  });
});

export default drugRouter;
module.exports = drugRouter;

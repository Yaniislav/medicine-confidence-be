import koaRouter from 'koa-router';
import middlewareWrapper from '../components/middlewareWrapper';
import { userAction } from '../action/user';
import { userValidate } from '../validator/user';

export const usersRouter = koaRouter({
  prefix: '/users',
});

usersRouter.get('/', async (ctx, next) => {
  await middlewareWrapper.wrape(ctx, next, async () => {
    const reqData = await userValidate.update(ctx.request.body, ctx.request.user);
    const result = await userAction.update(reqData);

    return result;
  });
});

import koaRouter from 'koa-router';
import middlewareWrapper from '../components/middlewareWrapper';
import { userValidate } from '../validator/user';

const accessAction = require('../actions/access');

const router = koaRouter({
  prefix: '/access',
});

router.post('/register', async (ctx, next) => {
  await middlewareWrapper.wrap(ctx, next, async () => {
    const { body } = ctx.request;
    await userValidate.create(body);

    const user = await accessAction.register(body);

    return user;
  });
});

router.post('/login', async (ctx, next) => {
  await middlewareWrapper.wrap(ctx, next, async () => {
    const res = await accessAction.login(ctx, next);

    return res;
  });
});

module.exports = router;

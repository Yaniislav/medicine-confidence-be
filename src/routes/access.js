const Router = require('koa-router');
const accessAction = require('../actions/acess');

const router = new Router({
  prefix: '/access',
});

router.post('/register', async (ctx) => {
  try {
    const { body } = ctx.request;
    ctx.body = await accessAction.register(body);
  } catch (e) {
    ctx.status = 500;
    ctx.body = e;
  }
});

router.post('/login', async (ctx, next) => {
  try {
    ctx.body = await accessAction.login(ctx, next);
  } catch (e) {
    ctx.status = 401;
    ctx.body = e;
  }
});

module.exports = router;

const passport = require('koa-passport');


async function authorization(ctx, next) {
  await passport.authenticate('jwt', async (err, user) => {
    if (!user) {
      ctx.status = 401;
    } else {
      ctx.user = user;
      await next();
    }
  })(ctx, next);
}

export default authorization;


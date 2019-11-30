const passport = require('koa-passport');


async function authorization(ctx, next) {
  await passport.authenticate('jwt', (err, user) => {
    if (!user) {
      ctx.status = 401;
    } else {
      ctx.user = user;
      next();
    }
  })(ctx, next);
}

module.exports = authorization;


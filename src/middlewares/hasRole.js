const hasRole = necessaryRole => async (ctx, next) => {
  const { role } = ctx.user;
  if (necessaryRole === role) {
    await next();
  } else {
    ctx.status = 403;
    ctx.body = {
      message: `It's allowed only for ${necessaryRole}`,
    };
  }
};

export default hasRole;


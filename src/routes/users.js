const Router = require('koa-router');
const authorization = require('../middlewares/authorization');

const router = new Router({
  prefix: '/users',
});

router.use(authorization);

module.exports = router;

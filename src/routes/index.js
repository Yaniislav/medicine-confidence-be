const Router = require('koa-router');
const path = require('path');
const fs = require('fs');

const initRoutes = (app) => {
  fs.readdir(__dirname, (err, data) => {
    if (err) throw err;
    data.forEach((pathStr) => {
      const router = require(path.join(__dirname, pathStr));
      if (router instanceof Router) {
        app
          .use(router.routes())
          .use(router.allowedMethods());
      }
    });
  });
};

module.exports = initRoutes;

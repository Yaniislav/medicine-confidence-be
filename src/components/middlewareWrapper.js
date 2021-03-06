class MiddlewareWrapper {

  headerSet(req) {
    /**
     * Response settings
     * @type {Object}
     */
    const responseSettings = {
      AccessControlAllowOrigin: req.header.origin,
      AccessControlAllowHeaders: 'Content-Type, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5,  Date, X-Api-Version, X-File-Name',
      AccessControlAllowMethods: 'POST, GET, PUT, DELETE, OPTIONS',
      AccessControlAllowCredentials: true,
    };

    /**
     * Headers
     */

    req.set('Access-Control-Allow-Credentials', responseSettings.AccessControlAllowCredentials);
    req.set('Access-Control-Allow-Origin', responseSettings.AccessControlAllowOrigin);
    req.set('Access-Control-Allow-Headers', (req.header['access-control-request-headers']) ? req.header['access-control-request-headers'] : responseSettings.AccessControlAllowHeaders);
    req.set('Access-Control-Allow-Methods', (req.header['access-control-request-method']) ? req.header['access-control-request-method'] : responseSettings.AccessControlAllowMethods);
  }

  singleError(error) {
    if (error instanceof Error) {
      return { message: 'Internal server error occurred' };
    } else if (!(error.message || error.param)) {
      return { message: 'Unknown server error occurred' };
    }

    return error;
  }

  errorBuilder(errors) {
    if (Array.isArray(errors)) {
      const errorArray = errors.map(this.singleError);

      return errorArray;
    }

    return [this.singleError(errors)];
  }

  async wrap(req, next, middleware) {
    try {
      req.body = await middleware();
      this.headerSet(req);
    } catch (err) {
      req.body = this.errorBuilder(err);
      req.status = err.status || 400;
      this.headerSet(req);
      return;
    }
    if (next) {
      await next();
    }
  }
}

export default new MiddlewareWrapper();

'use strict';

const Cookies = require('cookies');

module.exports = {
  nonce() {
    const nonce = strapi.service('plugin::eth.auth').generateNonce();
    return { nonce };
  },

  authenticated(ctx) {
    // create cookies
    const keys = strapi.config.get('plugin.eth.auth.keys');
    const cookies = new Cookies(ctx.req, ctx.res, {
      keys,
      secure: true,
    });
    const address = cookies.get('eth.session', { signed: true });
    return {
      success: typeof address !== 'undefined',
      address,
    };
  },

  async signIn(ctx) {
    const { message, signature } = ctx.request.body;
    const authService = strapi.service('plugin::eth.auth');
    try {
      await authService.authenticate(message, signature);
    } catch (e) {
      return ctx.badRequest(e.message);
    }
    // create cookies
    const keys = strapi.config.get('plugin.eth.auth.keys');
    const cookies = new Cookies(ctx.req, ctx.res, {
      keys,
      secure: true,
    });
    cookies.set('eth.session', message.address, {
      signed: true,
      maxAge: 3600000, // 1 hour
      sameSite: 'strict',
      secure: true,
    });
    return {
      success: true,
    };
  },

  async signOut(ctx) {
    // delete cookies
    const keys = strapi.config.get('plugin.eth.auth.keys');
    const cookies = new Cookies(ctx.req, ctx.res, {
      keys,
      secure: true,
    });
    cookies.set('eth.session', '', {
      signed: true,
      maxAge: new Date(), // now
      sameSite: 'strict',
      secure: true,
    });
    return {
      success: true,
    };
  },
};

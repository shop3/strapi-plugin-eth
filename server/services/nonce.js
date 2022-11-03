'use strict';

const { createCoreService } = require('@strapi/strapi').factories;
const { generateNonce } = require('siwe');

module.exports = createCoreService('plugin::eth.nonce', ({ strapi }) => ({
  async generateNonce(address) {
    let nonce;
    do {
      nonce = generateNonce();
    } while (await this.isUsedNonce(address, nonce));
    return nonce;
  },

  async isUsedNonce(address, nonce) {
    const nonceDb = await strapi.db.query('plugin::eth.nonce').findOne({
      where: {
        value: nonce,
        account: { address },
      }
    });
    return nonceDb !== null;
  }
}));
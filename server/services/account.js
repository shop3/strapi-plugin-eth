'use strict';

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('plugin::eth.account', ({ strapi }) => ({
  async findByAddress(address) {
    const accountDb = await strapi.db.query('plugin::eth.account').findOne({ where: { address } });
    return accountDb;
  }
}));
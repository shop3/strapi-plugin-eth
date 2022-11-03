'use strict';

const { SiweMessage } = require('siwe');

module.exports = ({ strapi }) => ({
  async authenticate(message, signature) {
    // create siwe message
    const siweMessage = new SiweMessage(message);
    // get the provider service
    const provider = strapi.service('plugin::eth.provider').getProvider(siweMessage.chainId);
    // get the domain
    const domain = strapi.config.get('plugin.eth.auth.domain');
    // validate siwe message
    try {
      await siweMessage.verify({
        signature,
        domain,
      }, {
        provider,
      });
    } catch (e) {
      strapi.log.error(e.error.type);
      throw new Error('Failed to validate SIWE message - Invalid signature');
    }
    // get nonce service
    const nonceService = strapi.service('plugin::eth.nonce');
    // check if nonce is used
    const isUsed = await nonceService.isUsedNonce(siweMessage.address, siweMessage.nonce);
    if (isUsed) {
      throw new Error('Failed to validate SIWE message - Nonce is already used');
    }
    // get account service
    const accountService = strapi.service('plugin::eth.account');
    // get account by address
    let account = await accountService.findByAddress(siweMessage.address);
    if (account === null) {
      // create account
      account = await accountService.create({
        data: {
          address: siweMessage.address
        }
      });
    }
    // create nonce
    await nonceService.create({
      data: {
        value: siweMessage.nonce,
        account: account.id,
      }
    });
  },
});

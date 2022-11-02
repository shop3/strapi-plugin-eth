'use strict';

const { generateNonce, SiweMessage } = require('siwe');

module.exports = ({ strapi }) => ({
  generateNonce() {
    return generateNonce();
  },

  async authenticate(message, signature) {
    // create siwe message
    const siweMessage = new SiweMessage(message);
    // get the provider service
    const provider = strapi.service('plugin::eth.provider').getProvider(siweMessage.chainId);
    // validate siwe message
    try {
      await siweMessage.validate(signature, provider);
    } catch (e) {
      strapi.log.error(e.message);
      throw new Error('Failed to validate SIWE message - Invalid signature');
    }

    // get the domain
    const domain = strapi.config.get('plugin.eth.auth.domain');
    // compare it with message domain
    if (siweMessage.domain !== domain) {
      throw new Error('Failed to validate SIWE message - Invalid domain');
    }
  },
});

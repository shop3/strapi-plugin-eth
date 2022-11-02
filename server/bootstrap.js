'use strict';

module.exports = ({ strapi }) => {
  const provider = strapi.service('plugin::eth.provider');
  provider.initialize();

  try {
    const walletService = strapi.service('plugin::eth.wallet');
    const wallet = walletService.getWallet();
    strapi.log.info('Wallet address: ' + wallet.address);
  } catch {
    strapi.log.warn('Wallet is disabled');
  }
};

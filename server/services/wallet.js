'use strict';

const ethers = require('ethers');

module.exports = ({ strapi }) => ({
  getWallet() {
    // get private key from config
    const privateKey = strapi.config.get('plugin.eth.wallet.privateKey');
    // throw if no private key is set
    if (!privateKey) {
      throw new Error('No private key set in config');
    }
    // create wallet from private key
    const wallet = new ethers.Wallet('0x' + privateKey);
    return wallet;
  },
});

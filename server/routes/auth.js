'use strict';

module.exports = [
  {
    method: 'GET',
    path: '/eth/nonce',
    handler: 'auth.nonce',
    config: {
      prefix: ''
    }
  },
  {
    method: 'GET',
    path: '/eth/authenticated',
    handler: 'auth.nonce',
    config: {
      prefix: ''
    }
  },
  {
    method: 'POST',
    path: '/eth/authenticate',
    handler: 'auth.signIn',
    config: {
      prefix: ''
    }
  },
  {
    method: 'POST',
    path: '/eth/logout',
    handler: 'auth.signOut',
    config: {
      prefix: ''
    }
  }
]
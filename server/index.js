'use strict';

const config = require('./config');
const controllers = require('./controllers');
const routes = require('./routes');
const register = require('./register');
const bootstrap = require('./bootstrap');
const services = require('./services');

module.exports = {
  config,
  controllers,
  routes,
  register,
  bootstrap,
  services,
};

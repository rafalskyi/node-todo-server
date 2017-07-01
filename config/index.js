'use strict';

process.env.NODE_ENV = 'development';

var config = {
  development: {
    mode: 'development',
    port: 3000,
    secretKey: 'ginger_cat',
    db: {
      billing: {
        host: 'localhost',
        user: 'webbank21',
        password: 'jgwa1Afdsaf!B',
        database: 'shared-rails_development'
      }
    }
  }
};
module.exports = function (mode) {
  return config[mode || process.argv[2]] || config.development;
}();

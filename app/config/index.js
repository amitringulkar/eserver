var env = require('../../.env');
var conf = require('./config');

var config = {
    get: _get
}
  
module.exports = config;

function _get(key, defaultValue = null) {
    if(env[key]) {
        return env[key];
    } else if(conf[key]) {
        return conf[key];
    }

    return defaultValue;
}

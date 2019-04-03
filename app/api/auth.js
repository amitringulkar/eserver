var modelAuth = require('../model/auth/auth.model')

var auth = {
    isAuthenticated: modelAuth.isAuthenticated,
    validateToken: modelAuth.validateToken,
};

module.exports = auth;
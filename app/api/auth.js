var modelAuth = require('../model/auth/auth.model')

var auth = {
    isAuthenticated: modelAuth.isAuthenticated
};

module.exports = auth;
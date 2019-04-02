var utils = {
    isEmpty: _isEmpty,
    getParam: _getParam,
    getRequestParam: _getRequestParam
}

module.exports = utils;

function _isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

function _getRequestParam(req, param) {
    var value = null;
    if(req && req.body && req.body[param]) {
        value = req.body[param];
    }
    return value;
}

function _getParam(req, param) {
    var value = null;
    if(req && req[param]) {
        value = req[param];
    }
    return value;
}
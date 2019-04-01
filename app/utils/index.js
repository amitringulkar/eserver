var utils = {
    isEmpty: _isEmpty
}

module.exports = utils;

function _isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}
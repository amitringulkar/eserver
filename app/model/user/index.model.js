var pool = require('../../db/mysql/connectionPool');

var utils = require('../../Utils');

module.exports = {
    validate: _validate,
    getUsers: _getUsers,
};

function _validate(data, callback) {
    if(data.username == 'undefinded' || data.password == 'undefined') {
        return callback({'message': 'Error in validation.', 'code': 401});
    }
    
    pool.getConnection(function(err, connection){
        if(err) {
            return callback({'message': 'Error in db connection.', 'code': 500});
        }

        var sql = 'select id, username, firstname from users where username = "' + data.username + '"';

        connection.query(sql, function(err, result) {
            if(err) {
                return callback(err);
            }
            if(utils.isEmpty(result)) {
                return callback({'message': 'User not found.', 'code': 500}, result);
            }
            return callback(null, result);
        });
    })
}

function _getUsers(callback) {
    pool.getConnection(function(err, connection){
        if(err) {
            return callback({'message': 'Failed to load users.', 'code': 500});
        }

        var sql = 'select id, username, firstname from users';

        connection.query(sql, function(err, result) {
            if(err) {
                return callback(err);
            }
            return callback(null, result);
        });
    });
}
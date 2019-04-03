var pool = require('../../db/mysql/connectionPool');

var utils = require('../../Utils');

module.exports = {
    validateUser: _validateUser,
    getUsers: _getUsers,
    getUserByUsername: _getUserByUsername,
};

function _validateUser(user, callback) {
    if(user.getUsername() == 'undefinded' || user.getPassword() == 'undefined') {
        return callback({'message': 'Error in validation.', 'code': 401});
    }
    
    pool.getConnection(function(err, connection) {
        if(err) {
            return callback({'message': 'Error in db connection.', 'code': 500});
        }

        var sql = 'select id, username, firstname from users where username = "' + user.getUsername() + '"';

        connection.query(sql, function(err, result) {
            if(err) {
                return callback(err);
            }
            if(utils.isEmpty(result)) {
                return callback({'message': 'Invalid User.', 'code': 500}, result);
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

function _getUserByUsername(user, callback) {
    if(!user.getUsername()) {
        return callback({'message': 'Username is required.', 'code': 401});
    }
    
    pool.getConnection(function(err, connection) {
        if(err) {
            return callback({'message': 'Error in db connection.', 'code': 500});
        }

        var sql = 'select * from users where username = "' + user.getUsername() + '"';

        connection.query(sql, function(err, result) {
            if(err) {
                return callback(err);
            }
            if(utils.isEmpty(result)) {
                return callback({'message': 'Invalid User.', 'code': 500}, result);
            }
            return callback(null, result[0]);
        });
    })
}
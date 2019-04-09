var pool = require('../../db/mysql/connectionPool');

var utils = require('../../Utils');

module.exports = {
    validateUser: _validateUser,
    getUsers: _getUsers,
    getUserByUsername: _getUserByUsername,
};

function _validateUser(user, callback) {
    if(user.getEmail() == 'undefinded' || user.getPassword() == 'undefined') {
        return callback({message: 'Error in validation.', status: 401});
    }
    
    pool.getConnection(function(err, connection) {
        if(err) {
            return callback({message: 'Error in db connection.', status: 200});
        }
        var sql = 'select * from users where emailId = "' + user.getEmail() + '" AND password = "' + user.getPassword() + '"';

        connection.query(sql, function(err, result) {
            if(err) {
                return callback(err);
            }
            if(utils.isEmpty(result)) {
                return callback({message: 'Invalid User.', status: 200}, result);
            }
            return callback(null, result[0]);
        });
    })
}

function _getUsers(callback) {
    pool.getConnection(function(err, connection){
        if(err) {
            return callback({message: 'Failed to load users.', status: 200});
        }

        var sql = 'select * from users';

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
        return callback({message: 'Username is required.', status: 401});
    }
    
    pool.getConnection(function(err, connection) {
        if(err) {
            return callback({message: 'Error in db connection.', status: 200});
        }

        var sql = 'select users.*, role.roleId, role.roleName from users JOIN role on role.roleId = users.roleId where username = "' + user.getUsername() + '"';

        connection.query(sql, function(err, result) {
            if(err) {
                return callback(err);
            }
            if(utils.isEmpty(result)) {
                return callback({message: 'Invalid User.', status: 200}, result);
            }
            return callback(null, result[0]);
        });
    })
}
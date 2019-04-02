function User() {
    this.setUsername = function(username) {
        this._username = username;
    }
    this.getUsername = function() {
        return this._username;
    }
    this.setPassword = function(password) {
        this._password = password;
    }

    this.getPassword = function() {
        return this._password;
    }
}

module.exports = User;
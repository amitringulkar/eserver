function User() {
    this.setUsername = function(username) {
        this.username = username;
    }
    this.getUsername = function() {
        return this.username;
    }
    this.setPassword = function(password) {
        this.password = password;
    }

    this.getPassword = function() {
        return this.password;
    }
    this.setEmail = function(email) {
        this.email = email;
    }
    this.getEmail = function() {
        return this.email;
    }
    this.setRole = function(role) {
        this.role = role;
    }
    this.getRole = function() {
        return this.role;
    }
}

module.exports = User;
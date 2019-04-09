var err = {
    status: null,
    message: null,
    getStatus: function () { return this.status },
    getMessage: function () { return this.message },
    sendError: function (res, err) { res.status(err.status ? err.status : 200); res.end(JSON.stringify(err)); }
}

module.exports = err;
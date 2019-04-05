var err = {
    code: null,
    message: null,
    getCode: function () { return this.code },
    getMessage: function () { return this.message },
    sendError: function (res, err) { res.status(err.code ? err.code : 500); res.end(JSON.stringify(err)); }
}

module.exports = err;
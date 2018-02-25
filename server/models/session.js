'use strict';
module.exports = (sequelize, DataTypes) => {
    var Session = sequelize.define('Session');
    var users = {};
    Session.sign = (token, data, expiresIn) => {
        users[token] = { 'data': data, 'expired_at': Date.now() / 1000 + expiresIn };
    }

    Session.verify = (token) => {
        if (users[token]) {
            if (users[token].expired_at > Date.now() / 1000)
                return users[token].data;
            delete users[token];
        }

        return null;
    }

    Session.out = (token) => {
        if (users[token]) {
            delete users[token];
        }
    }
    return Session;
};
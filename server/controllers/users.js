const User = require('../models').User;
const Session = require('../models').Session;
const md5 = require('md5');
module.exports = {
  login(req, res) {
    res.set('Content-Type', 'application/json');
    User.findOne({ where: { username: req.body.username } }).then(user => {
      if (!user || user.password !== req.body.password) {
        res.status(401).send(JSON.stringify({ 'message': 'invalid login' }));
      } else {
        var token = md5(user.username + Date.now());
        var data = {
          username: user.username,
          admin: user.admin
        }
        Session.sign(token, data, 24 * 3600);
        res.send({ 'token': token, 'role': user.admin ? 'ADMIN' : 'USER' });
      }
    }).catch(error => {
      throw error;
    });
  },
  logout(req, res) {
    Session.out(req.query.token);
    res.send({ 'message': 'logout success' });
  },
  index(req, res) {
    return User
      .findAll()
      .then(users => res.status(201).send(users))
      .catch(error => res.status(400).send(error));
  },
};

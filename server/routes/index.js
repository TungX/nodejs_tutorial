const usersController = require('../controllers').users;
const arilinesController = require('../controllers').airlines;
const flightsController = require('../controllers').flights;
const User = require('../models').User;
const Session = require('../models').Session;
module.exports = (app, express, Users) => {
    var apiRoutes = express.Router();
    apiRoutes.post('/auth/login', usersController.login);
    apiRoutes.use(function (req, res, next) {
        var token = req.query.token;
        if (token) {
            var decoded = Session.verify(token);
            if (decoded) {
                next();
            } else {
                return res.status(401).send({
                    message: 'Unauthorized user.'
                });
            }
        } else {
            return res.status(401).send({
                message: 'Unauthorized user.'
            });

        }
    });
    apiRoutes.get('/auth/logout', usersController.logout);
    apiRoutes.post('/airline', arilinesController.create);
    apiRoutes.post('/flight', flightsController.create);
    apiRoutes.get('/flight/:departure_date/:departure_city_name/:destination_city_name', flightsController.index);
    apiRoutes.get('/users', usersController.index);
    app.use('/v1', apiRoutes);
};

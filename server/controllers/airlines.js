const Airline = require('../models').Airline;
const Session = require('../models').Session;
module.exports = {
    create(req, res) {
        if(!Session.verify(req.query.token).admin){
            return res.status(422).send({'message':'Unauthorized user'});
        }
        
        return Airline.create({ airline_name: req.body.airline_name, city_name: req.body.city_name })
            .then(airline => res.send({ 'message': 'create success', 'id': airline.id }))
            .catch(error => res.status(422).send({'message':'Data cannot be processed'}));
    }
};

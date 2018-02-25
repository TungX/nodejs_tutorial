const Flight = require('../models').Flight;
const Session = require('../models').Session;
const Airline = require('../models').Airline;
module.exports = {
    create(req, res) {
        if (!Session.verify(req.query.token).admin) {
            return res.status(422).send({ 'message': 'Unauthorized user' });
        }

        return Flight.create({
            from_date: req.body.from_date,
            to_date: req.body.to_date,
            flight_time: req.body.flight_time,
            arrival_time: req.body.arrival_time,
            from_city_name: req.body.from_city_name,
            to_city_name: req.body.to_city_name,
            airline_id: req.body.airline_id,
            price: req.body.price,
        })
            .then(flight => res.send({ 'message': 'create success', 'id': flight.id }))
            .catch(error => {
                res.status(422).send({ 'message': 'Data cannot be processed' });
                console.log(error);
            });
    },
    index(req, res) {
        var departure_date = req.params.departure_date,
            departure_city_name = req.params.departure_city_name,
            destination_city_name = req.params.destination_city_name;
        if (isNaN(new Date(departure_date).getTime())) {
            return res.status(422).send({ 'message': 'Data cannot be processed' });
        }
        Flight.findAll({
            include: [{
                model: Airline,
                as: 'airline',
            }],
        }, {
                where: {
                    from_date: new Date(departure_date),
                    from_city_name: departure_city_name,
                    to_city_name: destination_city_name
                }
            })
            .then(flights => {
                var flight_infos = [];
                flights.forEach(flight => {
                    flight_infos.push({
                        flight_id: flight.id,
                        departure_time: flight.flight_time,
                        arrival_time: flight.arrival_time,
                        airline_id: flight.airline_id,
                        airline_name: flight.airline.airline_name,
                        departure_date: flight.from_date.toISOString().slice(0, 10),
                        departure_city_name: flight.from_city_name,
                        destination_city_name: flight.to_city_name
                    })
                });
                res.send({ 'flights': flight_infos });
            })
            .catch(error => {
                res.status(422).send({ 'message': 'Data cannot be processed' });
                console.log(error);
            });
    }
};

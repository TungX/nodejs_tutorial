'use strict';
module.exports = (sequelize, DataTypes) => {
  var Airline = sequelize.define('Airline', {
    airline_name: {type: DataTypes.STRING, allowNull: false, unique: true},
    city_name: {type: DataTypes.STRING, allowNull: false}
  }, {});
  Airline.associate = function(models) {
    Airline.hasMany(models.Flight, {
      foreignKey: 'airline_id',
      as: 'flights',
    });
  };
  return Airline;
};
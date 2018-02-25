'use strict';
module.exports = (sequelize, DataTypes) => {
  var Flight = sequelize.define('Flight', {
    from_date: { type: DataTypes.DATE, allowNull: false },
    to_date: { type: DataTypes.DATE, allowNull: false },
    flight_time: { type: DataTypes.TIME, allowNull: false },
    arrival_time: { type: DataTypes.TIME, allowNull: false },
    from_city_name: { type: DataTypes.STRING, allowNull: false },
    to_city_name: { type: DataTypes.STRING, allowNull: false },
    airline_id: { type: DataTypes.INTEGER, allowNull: false },
    price: { type: DataTypes.INTEGER, allowNull: false }
  }, {});
  Flight.associate = function (models) {
    Flight.belongsTo(models.Airline, {
      foreignKey: 'airline_id',
      as: 'airline',
      onDelete: 'CASCADE',
    });

    // associations can be defined here
  };
  return Flight;
};
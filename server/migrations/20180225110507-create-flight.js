'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Flights', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      from_date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      to_date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      flight_time: {
        type: Sequelize.TIME,
        allowNull: false
      },
      arrival_time: {
        type: Sequelize.TIME,
        allowNull: false
      },
      from_city_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      to_city_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      airline_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
        references: {
          model: 'Airlines',
          key: 'id',
          as: 'airline_id',
        },

      },
      price: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Flights');
  }
};
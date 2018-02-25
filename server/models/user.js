'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    username: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    admin: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false }
  }, {}, {
      indexes: [
        {
          unique: true,
          fields: ['username']
        },]
    });
  User.associate = function (models) {
    // associations can be defined here
  };
  return User;
};
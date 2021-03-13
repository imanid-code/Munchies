module.exports = function (sequelize, DataTypes) {
  const Restaurant = sequelize.define('Restaurant', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT
  });

  Restaurant.associate = function (models) {
    Restaurant.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  Restaurant.associate = function (models) {
    Restaurant.hasMany(models.Item, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Restaurant;
};

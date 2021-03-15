const restaurant = require("./restaurant");

module.exports = function (sequelize, DataTypes) {
  const Item = sequelize.define('Item', {
    name: DataTypes.STRING,
    rating: {
      type: DataTypes.INTEGER,
      validate: {
        len: [0, 5],
        allowNull: false,
        isInt: true
      }
    }
  });

  Item.associate = function (models) {
    Item.belongsTo(models.Restaurant, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Item;
};

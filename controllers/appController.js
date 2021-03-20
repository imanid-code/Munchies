module.exports = function (db) {
  return {
    // Get all Restaurants
    getRestaurants: function (req, res) {
      db.Restaurant.findAll({ where: { UserId: req.session.passport.user.id } }).then(function (dbRestaurants) {
        res.json(dbRestaurants);
      });
    },
    // Create a new Restaurant
    createRestaurant: function (req, res) {
      db.Restaurant.create(req.body).then(function (dbRestaurant) {
        res.json(dbRestaurant);
      });
    },
    // Delete a Restaurant by id
    deleteRestaurant: function (req, res) {
      db.Restaurant.destroy({ where: { id: req.params.id } }).then(function (dbRestaurant) {
        res.json(dbRestaurant);
      });
    },
    // Get all Items for a given restaurant
    getItems: function (req, res) {
      db.Item.findAll({ where: { RestaurantId: req.params.restaurantid } }).then(function (dbItems) {
        res.json(dbItems);
      });
    },
    // Creates a new Item
    createItem: function (req, res) {
      db.Item.create(req.body).then(function (dbItem) {
        res.json(dbItem);
      });
    },
    // Deletes the item with the given id
    deleteItem: function (req, res) {
      db.Item.destroy({ where: { id: req.params.id } }).then(function (dbItem) {
        res.json(dbItem);
      });
    },
    // Gets item based on a searched name
    getSearchedItem: function (req, res) {
      db.Item.findOne({ where: { name: req.params.name } }).then(function (results) {
        res.json(results);
      });
    }
  };
};

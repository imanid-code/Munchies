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
    }
  };
};

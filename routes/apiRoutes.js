const router = require('express').Router();
const appController = require('../controllers/appController');
const ensureAuthenticated = require('../middlewares/ensureAuthenticated');

module.exports = (passport, db) => {
  const AuthController = require('../controllers/authController')(passport, db);
  const AppController = require('../controllers/appController')(db);

  // Authentication
  router.post('/register', AuthController.register);
  router.post('/login', AuthController.login);
  router.get('/logout', AuthController.logout);
  router.put('/user/:id', ensureAuthenticated, AuthController.updateUser);
  router.delete('/user/:id', ensureAuthenticated, AuthController.deleteUser);
  router.post('/user/confirm', AuthController.confirmAuth);

  // App
  router.get('/restaurants', AppController.getRestaurants);
  router.post('/restaurants', AppController.createRestaurant);
  router.delete('/restaurants/:id', AppController.deleteRestaurant);
  router.get('/items/:restaurantid', AppController.getItems);
  router.post('/items', AppController.createItem);

  return router;
};

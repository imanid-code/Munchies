const router = require('express').Router();

module.exports = (db) => {
  // Load register page
  router.get('/register', (req, res) => {
    if (req.isAuthenticated()) {
      res.redirect('/profile');
    } else {
      res.render('register');
    }
  });

  // Load profile page
  router.get('/profile', (req, res) => {
    if (req.isAuthenticated()) {
      db.User.findOne({
        where: {
          id: req.session.passport.user.id
        }
      }).then(() => {
        const user = {
          userInfo: req.session.passport.user,
          isloggedin: req.isAuthenticated()
        };
        // console.log(user);
        res.render('profile', user);
      });
    } else {
      res.redirect('/');
    }
  });

  // Load dashboard page
  router.get('/', (req, res) => {
    if (req.isAuthenticated()) {
      const user = {
        user: req.session.passport.user,
        isloggedin: req.isAuthenticated()
      };
      res.render('dashboard', user);
    } else {
      res.render('dashboard');
    }
  });

  // Load dashboard page
  router.get('/dashboard', (req, res) => {
    if (req.isAuthenticated()) {
      const user = {
        user: req.session.passport.user,
        isloggedin: req.isAuthenticated()
      };
      res.render('dashboard', user);
    } else {
      res.render('dashboard');
    }
  });

  // Load restaurant index page
  router.get('/restaurant', function (req, res) {
    if (req.isAuthenticated()) {
      db.Restaurant.findAll({ where: { UserId: req.session.passport.user.id }, raw: true }).then(function (dbRestaurants) {
        res.render('restaurant', {
          userInfo: req.session.passport.user,
          isloggedin: req.isAuthenticated(),
          msg: 'Welcome!',
          restaurants: dbRestaurants
        });
      });
    } else {
      res.redirect('/');
    }
  });

  // Load restaurant page and pass in an restaurant by id
  router.get('/restaurant/:id', function (req, res) {
    if (req.isAuthenticated()) {
      db.Restaurant.findOne({ where: { id: req.params.id }, raw: true }).then(function (dbRestaurant) {
        res.render('restaurant-detail', {
          userInfo: req.session.passport.user,
          isloggedin: req.isAuthenticated(),
          restaurant: dbRestaurant
        });
      });
    } else {
      res.redirect('/');
    }
  });

  // Logout
  router.get('/logout', (req, res, next) => {
    req.logout();
    req.session.destroy((err) => {
      if (err) {
        return next(err);
      }
      res.clearCookie('connect.sid', { path: '/' });
      res.redirect('/');
    });
  });

  // Render 404 page for any unmatched routes
  router.get('*', function (req, res) {
    res.render('404');
  });

  return router;
};

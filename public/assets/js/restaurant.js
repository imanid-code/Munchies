// Get references to page elements
const $restaurantText = $('#restaurant-name');
const $restaurantDescription = $('#restaurant-description');
const $submitBtn = $('#submit');
const $restaurantList = $('#restaurant-list');

// The API object contains methods for each kind of request we'll make
const API = {
  saveRestaurant: function (restaurant) {
    return $.ajax({
      headers: {
        'Content-Type': 'application/json'
      },
      type: 'POST',
      url: 'api/restaurants',
      data: JSON.stringify(restaurant)
    });
  },
  getRestaurants: function () {
    return $.ajax({
      url: 'api/restaurants',
      type: 'GET'
    });
  },
  deleteRestaurant: function (id) {
    return $.ajax({
      url: 'api/restaurants/' + id,
      type: 'DELETE'
    });
  }
};

// refreshRestaurants gets new restaurants from the db and repopulates the list
const refreshRestaurants = function () {
  API.getRestaurants().then(function (data) {
    const $restaurants = data.map(function (restaurant) {
      const $a = $('<a>')
        .text(restaurant.name)
        .attr('href', '/restaurant/' + restaurant.id);

      const $li = $('<li>')
        .attr({
          class: 'list-group-item',
          'data-id': restaurant.id
        })
        .append($a);

      const $button = $('<button>')
        .addClass('btn btn-danger float-right delete')
        .text('ｘ');

      $li.append($button);

      return $li;
    });

    $restaurantList.empty();
    $restaurantList.append($restaurants);
  });
};

// handleFormSubmit is called whenever we submit a new restaurant
// Save the new restaurant to the db and refresh the list
const handleFormSubmit = function (event) {
  event.preventDefault();

  const restaurant = {
    name: $restaurantText.val().trim(),
    description: $restaurantDescription.val().trim(),
    UserId: window.userId
  };
  if (!(restaurant.name && restaurant.description)) {
    alert('You must enter a restaurant name and description!');
    return;
  }

  API.saveRestaurant(restaurant).then(function () {
    refreshRestaurants();
  });

  $restaurantText.val('');
  $restaurantDescription.val('');
};

// handleDeleteBtnClick is called when an restaurant's delete button is clicked
// Remove the restaurant from the db and refresh the list
const handleDeleteBtnClick = function () {
  const idToDelete = $(this).parent().attr('data-id');

  API.deleteRestaurant(idToDelete).then(function () {
    refreshRestaurants();
  });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on('click', handleFormSubmit);
$restaurantList.on('click', '.delete', handleDeleteBtnClick);

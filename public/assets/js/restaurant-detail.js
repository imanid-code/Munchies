// Get references to page elements
const $itemName = $('#item-name');
const $itemRating = $('#item-rating');
const $submitBtn = $('#create-submit');
const $itemList = $('#item-list');
const $searchInput = $('#search-input');
const $searchBtn = $('#search-submit');

// The API object contains methods for each kind of request we'll make
const API = {
  saveItem: function (item) {
    return $.ajax({
      headers: {
        'Content-Type': 'application/json'
      },
      type: 'POST',
      url: '/api/items',
      data: JSON.stringify(item)
    });
  },
  getItems: function (id) {
    return $.ajax({
      url: '/api/items/' + id,
      type: 'GET'
    });
  },
  deleteItem: function (id) {
    return $.ajax({
      url: '/api/items/' + id,
      type: 'DELETE'
    });
  },
  searchItem: function (name) {
    return $.ajax({
      url: '/api/items/search/' + name,
      type: 'GET'
    });
  }
};

// refreshitems gets new items from the db and repopulates the list
const refreshItems = function () {
  const id = window.restaurantId;

  API.getItems(id).then(function (data) {
    const $items = data.map(function (item) {
      const $name = $('<span>')
        .text(item.name);

      const $br = $('<br>');

      const $rating = $('<span>')
        .text(item.rating + '/5');

      const $li = $('<li>')
        .attr({
          class: 'list-group-item',
          'data-id': item.id
        })
        .append($name)
        .append($br)
        .append($rating);

      const $button = $('<button>')
        .addClass('btn btn-danger float-right delete')
        .text('ｘ');

      $li.append($button);

      return $li;
    });

    $itemList.empty();
    $itemList.append($items);
  });
};

// handleFormSubmit is called whenever we submit a new item
// Save the new item to the db and refresh the list
const handleFormSubmit = function (event) {
  event.preventDefault();

  const item = {
    name: $itemName.val().trim(),
    rating: $itemRating.val().trim(),
    RestaurantId: window.restaurantId
  };
  if (!(item.name && item.rating)) {
    alert('You must enter an item name and rating!');
    return;
  }

  API.saveItem(item).then(function () {
    refreshItems();
  });

  $itemName.val('');
  $itemRating.val('');
};

// handleDeleteBtnClick is called when an item's delete button is clicked
// Remove the item from the db and refresh the list
const handleDeleteBtnClick = function (event) {
  event.preventDefault();

  const idToDelete = $(this).parent().attr('data-id');

  API.deleteItem(idToDelete).then(function () {
    refreshItems();
  });
};

const handleSearchBtnClick = function (event) {
  event.preventDefault();

  // TODO: add a .toLowerCase() and make SQL search ignore case
  const name = $searchInput.val().trim();

  API.searchItem(name).then(function (results) {
    // TODO: Make results render as the only item in the item list
    console.log(results);
  });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on('click', handleFormSubmit);
$itemList.on('click', '.delete', handleDeleteBtnClick);
$searchBtn.on('click', handleSearchBtnClick);

drop database if exists project2_dev;
create database project2_dev;

use project2_dev;
CREATE TABLE restaurant(
    restaurant_id int not null auto_increment primary key,
    restaurant_name varchar(40) NOT NULL,
    restaurant_rating int not null
)

CREATE TABLE items (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30) UNIQUE NOT NULL,
  rating int NOT NULL,
  restaurant_id INT UNSIGNED NOT NULL,
  INDEX res_ind (restaurant_id),
  CONSTRAINT fk_restaurant FOREIGN KEY (restaurant_id) REFERENCES restaurant(id) ON DELETE CASCADE
);

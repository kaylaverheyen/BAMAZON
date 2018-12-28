DROP DATABASE IF EXISTS bamazonDB;

CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(255) NOT NULL,
  department_name VARCHAR(255) NOT NULL,
  price DECIMAL(10,2),
  stock_quantity INT NOT NULL,
  PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("shirt", "clothing", 25.99, 15), ("denim_jacket", "clothing", 80.00, 8), ("polariod_instax_mini_9_camera", "cameras", 79.00, 8), ("cactus_lamp", "home_goods", 56.00, 4), ("white_picture_frame", "home_goods", 24.99, 7), ("ceramic_flower_pot", "home_goods", 16.99, 10), ("houndstooth_scarf", "clothing", 30.99, 8), ("2019_planner", "office_supplies", 15.99, 9), ("wicker_bag", "accessories", 42.00, 4), ("beaded_blue_necklace", "accessories", 26.00, 6);


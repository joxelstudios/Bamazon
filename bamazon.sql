DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(45) NULL,
  department VARCHAR(45) NULL,
  price DECIMAL(10,2) NULL,
  quantity INT NULL,
  PRIMARY KEY (id)
);

INSERT INTO products (name, price, quantity, department)
VALUES ("Playstaytion 4", 200, 50, "Game Consoles");

INSERT INTO products (name, price, quantity, department)
VALUES ("Xbox One S", 200, 50, "Game Consoles");

INSERT INTO products (name, price, quantity, department)
VALUES ("Nintendo Switch", 200, 50, "Game Consoles");

INSERT INTO products (name, price, quantity, department)
VALUES ("LG 50-inch 4K TV", 500, 50, "Home Theater");

INSERT INTO products (name, price, quantity, department)
VALUES ("Asus Laptop", 799, 50, "Computers");

INSERT INTO products (name, price, quantity, department)
VALUES ("Gaming Mouse", 50, 50, "Computers");

INSERT INTO products (name, price, quantity, department)
VALUES ("Blender", 89, 50, "Kitchen & Appliances");

INSERT INTO products (name, price, quantity, department)
VALUES ("iPhone XS", 999, 50, "Cell Phones");

INSERT INTO products (name, price, quantity, department)
VALUES ("Sony Wireless Headphones", 200, 50, "Audio");

INSERT INTO products (name, price, quantity, department)
VALUES ("Bose Wireless Speaker", 399, 50, "Audio");







-- ### Alternative way to insert more than one row
-- INSERT INTO products (name, price, quantity)
-- VALUES ("vanilla", 2.50, 100), ("chocolate", 3.10, 120), ("strawberry", 3.25, 75);

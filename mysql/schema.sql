--Create a MySQL Database called bamazon.
CREATE DATABASE IF NOT EXISTS Bamazon;

USE Bamazon;

--Then create a Table inside of that database called products.
CREATE TABLE IF NOT EXISTS products (
    itemId         INTEGER(10)    NOT NULL  AUTO_INCREMENT,
    productName    VARCHAR(50)    NOT NULL,
    departmentName VARCHAR(30)    NOT NULL,
    price          DECIMAL(5,2)  NOT NULL,
    stockQuantity  INTEGER(10)    NOT NULL,
    PRIMARY KEY (itemId)
);

--Populate this database with around 10 different products. (i.e. Insert "mock" data rows into this database and table).
INSERT INTO products(productName, departmentName, price, stockQuantity)
VALUES ("Eggs", "grocery", 1.99, 12),
  ("Milk", "grocery", 2.99, 24),
  ("PS4", "electronics", 199.99, 5),
  ("Xbox One", "electronics", 179.99, 7),
  ("iPhone X", "electronics", 399.99, 18),
  ("Bicycle", "sporting goods", 599.99, 2),
  ("Football", "sporting goods", 9.99, 49),
  ("The Holy Bible", "books", 9.99, 69),
  ("Game of Thrones", "books", 19.99, 33),
  ("Fight Club", "books", 11.99, 6),
  ("The Lion King", "dvds", 13.99, 36),  
  ("Office Space", "dvds", 9.99, 21),
  ("Dark Side of the Moon", "music", 11.55, 15);
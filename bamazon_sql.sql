DROP DATABASE IF EXISTS Bamazon;

CREATE DATABASE Bamazon;

USE Bamazon;

CREATE TABLE products (
 Item_ID INT NOT NULL AUTO_INCREMENT,
 Product_Name VARCHAR(50) NOT NULL,
 Department_Name VARCHAR(50) NOT NULL,
 Price DECIMAL(10,2) NOT NULL,
 Stock_Quantity INT(10),
 PRIMARY KEY (Item_ID)
 );
 
INSERT INTO products (Product_Name, Department_Name, Price, Stock_Quantity)
VALUES ('Msi Laptop', 'Electronics', 1000.00, 20);
 
INSERT INTO products (Product_Name, Department_Name, Price, Stock_Quantity)
VALUES ('Msi Desktop', 'Electronics', 1600.00, 25);
 
INSERT INTO products (Product_Name, Department_Name, Price, Stock_Quantity)
VALUES ('Socks', 'Clothing', 10.00, 150);
 
INSERT INTO products (Product_Name, Department_Name, Price, Stock_Quantity)
VALUES ('Hoodie', 'Clothing', 30.00, 50);
 
INSERT INTO products (Product_Name, Department_Name, Price, Stock_Quantity)
VALUES ('Vans Shoes', 'Clothing', 45.30, 50);
 
INSERT INTO products (Product_Name, Department_Name, Price, Stock_Quantity)
VALUES ('Bananas', 'Food', 5.00, 50);
 
INSERT INTO products (Product_Name, Department_Name, Price, Stock_Quantity)
VALUES ('Cinnamon Toast Crunch', 'Food', 6.99, 50);
 
INSERT INTO products (Product_Name, Department_Name, Price, Stock_Quantity)
VALUES ('The Departed', 'Movies', 10.00, 5);
 
INSERT INTO products (Product_Name, Department_Name, Price, Stock_Quantity)
VALUES ('Lock, Stock, Two Smoking Barrels', 'Movies', 15.50, 10);
 
INSERT INTO products (Product_Name, Department_Name, Price, Stock_Quantity)
VALUES ('Gold Grill', 'Jewellery', 7200.00, 20);

SELECT * FROM products;
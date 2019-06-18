#BAMAZON 

# An Introduction to Bamazon
Welcome to Bamazon! Please have a look around and shop to your heart's content!

### Who will use this?
Users who enjoy online shopping will find it easy to browse and find what they're looking for. 

### What is the goal?
The primary goal is familiarity with MySQL. The minimum requirements included putting together a customer interface. Additional options were to create a manager function and supervisor area, where additional joins and real-time calculations would be required to display additional data.

# Deployment
Node is required to run this app. After downloading the repository, run `npm install` from the command line to ensure you have the necessary packages (mysql & inquirer).

You will also need to setup a MySQL database on your localhost and update `constructors/keys.js` to include your local password information. You may use the following SQL:

```
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
product_id INTEGER NOT NULL auto_increment PRIMARY KEY,
product_name VARCHAR(30) NOT NULL,
department_name VARCHAR(30) NOT NULL,
price DOUBLE NOT NULL,
stock_quantity INTEGER NOT NULL DEFAULT '0',
product_sales DOUBLE NOT NULL DEFAULT '0'
);

CREATE TABLE departments (
department_id INTEGER NOT NULL auto_increment PRIMARY KEY,
department_name VARCHAR(30) NOT NULL,
overhead_costs DOUBLE NOT NULL DEFAULT '0'
);

```

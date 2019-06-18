var mysql = require('mysql');
var inquirer = require('inquirer');
var connection = require('./constructors/keys.js');

// connect to the mysql server and sql database
connection.connect(function(err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  readProducts();
});

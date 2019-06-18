var mysql = require('mysql');
var inquirer = require('inquirer');
var connection = require('./constructors/connection');

// connect to the mysql server and sql database
connection.connect(function(err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  readProducts();
});

function buyItem() {
	// query the database for all items with at least 1 in stock
	connection.query("SELECT * FROM products WHERE stock_quantity > 0", function(err, results) {
		if (err) throw err;
		// once you have the items, prompt the user for which they'd like to buy
		inquirer.prompt([
			{
				name: "choice",
				type: "list",
				choices: function() {
					var choiceArray = [];
					for (var i = 0; i < results.length; i++) {
						choiceArray.push(results[i].product_name);
					}
					return choiceArray;
				},
				message: "What item would you like to purchase?"
			},
			{
				name: "quantity",
				type: "input",
				message: "How many would you like to purchase?",
				validate: function(value) {
					if (isNaN(value) === false) {
						return true;
					}
					return false;
				}
			}
		])
		.then(function(answer) {
			// get the information of the chosen item
			var chosenItem;
			for (var i = 0; i < results.length; i++) {
				if (results[i].product_name === answer.choice) {
					chosenItem = results[i];
				}
			}

            // determine if quantity is high enough
			if (chosenItem.stock_quantity >= parseInt(answer.quantity)) {
				// There is enough; reduce the stock in the database and provide the customer's total
				var newQuantity = parseInt(chosenItem.stock_quantity) - parseInt(answer.quantity);
				var totalPrice = parseFloat(chosenItem.price) * answer.quantity;
				connection.query(
					"UPDATE products SET ? WHERE ?",
					[
						{
							stock_quantity: newQuantity,
							product_sales: (parseFloat(chosenItem.product_sales) + parseFloat(totalPrice)).toFixed(2)
						},
						{
							item_id: chosenItem.item_id
						}
					],
					function(error) {
						if (error) throw error;
						console.log("Thanks for shopping! Your total is $" + totalPrice + ".\n");
						moreShopping();
					}
				);
			}
			else {
				// stock_quantity wasn't high enough, so apologize and start over
				console.log("I'm sorry, we only have " + chosenItem.stock_quantity + " of those.\n");
				moreShopping();
			}
		});
	});
}

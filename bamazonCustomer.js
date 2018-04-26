// Require  packages 
var inquirer = require("inquirer");
var mysql = require("mysql");
// Link to mySQL Database
var connection = mysql.createConnection({
    host: "localhost",
    port: 3300,
    user: "root",
    password: "password",
    database: "Bamazon"
});
// Connect to Database
connection.connect(function (err) {
    if (err) throw err;
    console.log("Welcome to Bamazon!" );
    showItems();
});
// Display database and sell an item to customer
function showItems() {
    connection.query("SELECT * FROM `products`", function (err, res) {
        if (err) throw err;
        // Loop through database and show items
        for (var i = 0; i < res.length; i++) {
            console.log("ID " + res[i].itemId + "|", "Product " + res[i].productName + "|", "Price $" + res[i].price);
            console.log("\n--------------------------------------\n");
        };
        inquiries();
    })};
//After the table is shown,prompt inquirer messages
function inquiries() {
    inquirer.prompt([{
        //The first should ask them the ID of the product they would like to buy.
            type: 'input',
            name: 'itemId',
            message: 'Please enter the Item ID of an item you would like to buy.'
        },
        {
            //The second message should ask how many units of the product they would like to buy.
            type: 'input',
            name: 'quantity',
            message: 'How many would you like?',
            validate: function (value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        }
    ]).then(function (input) {
        var item = parseInt(input.itemId);
        var inputQuantity = parseInt(input.quantity);
        checkout(item, inputQuantity);
    });

    function checkout(ID, qty) {
        // Once the customer has placed the order, check if store has enough of the product to meet the request
        connection.query("SELECT * FROM `products` WHERE `itemId` = ?" + ID, function (err, results, fields) {
            if (err) throw err;
            if (qty <= results[0].stock) {
                // calculate cost of the transaction. 
                var custTotal = results[0].price * qty;
                console.log("The total cost of this purchase is $" +custTotal);
                // Update mySQL database with reduced inventory
                connection.query("UPDATE `products` SET `stock` = `stock` - " + qty + " WHERE `itemId` = " + ID);
                console.log('\nTransaction Completed. Thank you!')
                connection.end(); // end the script/connection
            } else {
                // Insufficient inventory
                console.log("Sorry, that item is not in stock.");
                inquiries();
            }
        });
    }

};


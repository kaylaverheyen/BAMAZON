
require("dotenv").config();
//installed 
const mysql = require("mysql");
//installed 
const inquirer = require("inquirer");
// Require table npm to create a table in node -- need to install!!
//const table = require("table").table;
var Table = require('cli-table');


// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",
    // Your port; if not 3306
    port: 3306,
    // Your username
    user: "root",
    // Your password
    password: process.env.MYSQL_PW,
    database: "bamazonDB"
});

// connect to the mysql server and sql database
connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    // run the start function after the connection is made to prompt the user
    displayProducts();
});

// function which prompts the user for what action they should take
function displayProducts() {
    console.log("products available on BAMAZON: ");
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) {
            throw err;
        };
        // instantiate
        var table = new Table({
            head: ['ID', 'Product', 'Department', 'Price', 'Quantity']
        });

        for (var i = 0; i < res.length; i++) {
            var productArr = [];
            for (var key in res[i]) {
                productArr.push(res[i][key]);
            }
            table.push(productArr);
        }

        console.log(table.toString());
        //var data = res.forEach(row => console.log(`id: ${row.id} | ${row.product_name} | $ ${row.price} | how many left: ${row.stock_quantity} | Dept: ${row.department_name}`));
        // console.log(data);
        placeOrder();
    });
};


function placeOrder() {
    inquirer
        .prompt([{
            name: "ID",
            type: "input",
            message: "Which product would you like to buy? Please select an ID"
        },
        {
            name: "Quantity",
            type: "input",
            message: "How many would you like to purchase?"
        }])
        .then(function (answer) {
            //grab price and id from table 
            connection.query("SELECT stock_quantity, price FROM products WHERE ?", { id: parseInt(answer.ID) }, function (err, res) {
                if (err) {
                    throw err;
                };
                if (res[0].stock_quantity >= parseInt(answer.Quantity)) {
                    var new_quantity = res[0].stock_quantity - parseInt(answer.Quantity);


                    // update quantity
                    connection.query("UPDATE products SET ? WHERE ?", [{ stock_quantity: new_quantity }, { id: parseInt(answer.ID) }], function (err, temp) {
                        if (err) {
                            throw err;
                        };
                        //count price for the order
                        var p = res[0].price * parseInt(answer.Quantity);
                        console.log("Order total is: " + p);
                    });
                }
                else {
                    console.log("Insufficient Quantity!!");
                }

                //copy code of display products
                connection.query("SELECT * FROM products", function (err, res) {
                    if (err) {
                        throw err;
                    };
                    // instantiate
                    var table = new Table({
                        head: ['ID', 'Product', 'Department', 'Price', 'Quantity']
                    });

                    for (var i = 0; i < res.length; i++) {
                        var productArr = [];
                        for (var key in res[i]) {
                            productArr.push(res[i][key]);
                        }
                        table.push(productArr);
                    }

                    console.log(table.toString());
                });
                //end connection 

                connection.end();
            });
        });
}

//}

const cTable = require('console.table');
var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({

    host: "localhost",

    port: 3306,

    user: "root",

    password: "passwood",

    database: "Bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    start();
});

function start() {
    inquirer.prompt([
        {
            name: "manager",
            type: "list",
            message: "Welcone Manager, What would you like to do?",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add to Products", "Exit Manager Mode"]
        },
    ]).then(function (answer) {
        if (answer.manager === "View Products for Sale") {
            connection.query("SELECT * FROM products", function (err, res) {
                console.table(res)
                start();
            });
        }
        else if (answer.manager === "View Low Inventory") {
            connection.query("SELECT * FROM products WHERE Stock_Quantity <5", function (err, res) {
                console.table(res)
                start();
            });
        }
        else if (answer.manager === "Add to Inventory") {
            connection.query("SELECT * FROM products", function (err, res) {
                console.table(res)
                inquirer.prompt([
                    {
                        name: "productChoice",
                        type: "input",
                        message: "Which Item_Id would you like to Add to"
                    },
                    {
                        name: "amount",
                        type: "input",
                        message: "How much would you like to Add?"
                    }
                ]).then(function (answer) {
                    var query = "Select * FROM products WHERE ?"
                    connection.query(query, { Item_ID: answer.productChoice }, function (err, res) {
                        var newAmount = parseInt(answer.amount) + res[0].Stock_Quantity
                        connection.query("UPDATE products SET ? WHERE ?"
                            , [
                                {
                                    Stock_Quantity: newAmount,
                                },
                                {
                                    Item_ID: answer.productChoice,
                                }

                            ], function (err, res) {
                                if (err) throw err;
                                console.log("The Updated Stock_Quantity is: " + newAmount);
                                start();
                            })


                    },
                    )
                })
            });
        }
        else if (answer.manager === "Add to Products") {
            inquirer.prompt([
                {
                    name: "productName",
                    type: "input",
                    message: " Enter the Name of the New Product you would like to Add: "
                },
                {
                    name: "department",
                    type: "input",
                    message: "What Department shall we put it in?"
                },
                {
                    name: "price",
                    type: "input",
                    message: "How much shall this cost per unit?"
                },
                {
                    name: "stock",
                    type: "input",
                    message: "How many do we have to start with?"
                }
            ]).then(function (answer) {
                connection.query("INSERT INTO products (Product_Name, Department_Name, Price, Stock_Quantity) VALUES ('" + answer.productName + "','" + answer.department + "'," + answer.price + ", " + parseInt(answer.stock) + ")",
                    [
                        {
                            Product_Name: answer.productName
                        },
                        {
                            Department_Name: answer.department
                        }
                    ], function (err) {
                        if (err) throw err;
                        console.log("Success! " + answer.productName + " has been added to the store!")
                        start();
                    }
                )
            })
        }
        else if (answer.manager === "Exit Manager Mode"){
            connection.end();
        }
    })
}
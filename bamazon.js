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
    inquirer.prompt([
        {
            name:"welcome",
            type:"list",
            message:"Welcome To Bamazon! Would you like to come in?",
            choices: ["Enter", "Walk away in confusion"]
        }
    ]).then(function(answer){
        if(answer.welcome === "Enter"){
            start();
        }
        else {
            connection.end();
            console.log("Return when you have found yourself")
        }
    })
});

function start() {
    connection.query("SELECT * FROM products", function (err, res) {
        console.table(res)
        inquirer
            .prompt([
                {
                    name: "item",
                    type: "input",
                    message: "What is the Item_ID of the item you'd like to buy?",
                },
                {
                    name: "amount",
                    type: "input",
                    message: "How many of the item would you like to buy?"
                },
            ]).then(function (answer) {
                var query = "Select * FROM products WHERE ?"
                connection.query(query, { Item_ID: answer.item }, function (err, res) {
                    if (err) throw err
                    if (answer.item > 10) {
                        console.log("Sorry, that Product does'nt exist");
                        return start();
                    } else if (answer.amount > res[0].Stock_Quantity) {
                        console.log("Whoops, we don't have that many!");
                        inquirer.prompt([
                            {
                                name: "continue",
                                type: "list",
                                choices: ["Return to Products List", "exit Bamazon"]
                                
                            },
                        ]).then(function(answer) {
                            if(answer.continue === "Return to Products List"){
                                start();
                            }
                            else{
                                connection.end();
                            }
                        })
                    } else {
                        console.log("Your Order is on it's way...");
                        var newQuantity = res[0].Stock_Quantity - parseInt(answer.amount);
                        var totalCost = (parseFloat(res[0].Price) * parseInt(answer.amount));
                        console.log("Total Cost: $" + totalCost +" dollars");
                        connection.query(
                            "UPDATE products SET ? WHERE ?",
                            [
                                {
                                    Stock_Quantity: newQuantity
                                },
                                {
                                    Item_ID: answer.item
                                }
                            ],
                            function (err) {
                                if (err) throw err
                                inquirer.prompt([
                                    {
                                        name:"endChoice",
                                        type:"list",
                                        choices: ["Exit Bamazon", "Purchase another item"]
                                    },
                                ]).then(function (answer) {
                                    if(answer.endChoice === "Exit Bamazon") {
                                        connection.end();
                                    } else if (answer.endChoice === "Purchase another item") {
                                        start();
                                    }
                                })
                            }
                        )
                    }
                })

            })
    });
}
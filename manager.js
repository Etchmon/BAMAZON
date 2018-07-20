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

connection.connect(function(err) {
    if (err) throw err;
    inquirer.prompt([
        {
            name:"manager",
            type:"list",
            message:"Welcone Manager, What would you like to do?",
            choices:["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add to Products"]
        },
    ]).then(function(answer){
        if(answer.manager === "View Products for Sale"){
            connection.query("SELECT * FROM products", function (err, res) {
                console.table(res)
            });
        }
        else if(answer.manager === "View Low Inventory"){
            connection.query("SELECT * FROM products WHERE Stock_Quantity <5", function(err, res){
                console.table(res)
            });
        }
        else if(answer.manager === "Add to Inventory") {
            connection.query("SELECT * FROM products", function (err, res) {
                console.table(res)
                inquirer.prompt([
                    {
                        name:"productChoice",
                        type:"input",
                        message:"Which Item_Id would you like to Add"
                    },
                    {
                        name:"amount",
                        type:"input",
                        message:"How many would you like to Add?"
                    }
                ]).then(function(answer){
                    var newQuantity = answer.amount + res.Stock_quantity;
                    console.log(newQuantity);
                    
                })
            });
        }
        else if(answer.manager === "Add to Products") {

        }
    })
})
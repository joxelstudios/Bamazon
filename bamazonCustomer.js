var mysql = require("mysql");
var inq = require("inquirer");
var cart = [];
var itemAmount = [];

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "root",
    database: "bamazon_db"
});


connection.connect(function (err) {
    if (err) throw err;
    console.log('------------------------------------');
    console.log("connected as id " + connection.threadId + "\n");
    console.log('------------------------------------');
    displayInv();
});

function displayInv() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        console.log("|ID| " + "| Name | " + "| Deparment | " + "| Price | " + "| Quantity |");
        res.forEach(function (element) {
            console.log('-----------------------------------------------------------');
            console.log("|" + element.id + "| " + "|" + element.name + "| " + "|" + element.department + "| " + "|" + element.price + "| " + "|" + element.quantity + "| ");
            console.log('-----------------------------------------------------------');
        });
        choice();
    });

}

function amount(){
    inq.prompt([{
        type: 'text',
        name: 'amount',
        message: "How many would you like to buy?"
    }]).then(function (amount) {
        if (!amount) {
            console.log('------------------------------------');
            console.log("Please enter an amount.");
            console.log('------------------------------------');
            choice();
        }
        itemAmount.push(amount);
        console.log('------------------------------------');
        console.log("Added item(s) to cart!");
        console.log(cart);
        console.log(amount);
        console.log('------------------------------------');
    });

};


function choice() {
    inq.prompt([{
        type: 'text',
        name: 'item',
        message: "What would you like to buy? Enter an ID"
    }]).then(function (answer) {
        if (!answer.choice) {
            console.log('------------------------------------');
            console.log("Please enter an ID.");
            console.log('------------------------------------');
            choice();
        }
        cart.push(answer);
        amount();
        
       
    });
}



// function post() {
//     inq.prompt([{
//             type: 'input',
//             name: 'post',
//             message: "What would you like to post?",
//         },
//         {
//             type: 'input',
//             name: 'price',
//             message: "How much would you like to sell it for?",

//         }
//     ]).then(function (answer) {
//         if (!answer) {
//             console.log('------------------------------------');
//             console.log("There was an error...Oops");
//             console.log('------------------------------------');
//         }

//         var newItem = answer.post;
//         var newPrice = answer.price;
//         connection.query("INSERT INTO products SET ?", {
//                 name: newItem,
//                 bid: newPrice
//             },
//             function (err, res) {
//                 console.log('------------------------------------');
//                 console.log(res.affectedRows + "Product inserted!\n");
//                 console.log('------------------------------------');
//             })



//     });
// }

// function queryProducts(){
//     connection.query("SELECT * FROM products", function(err, res) {
//         if (err) throw err;
//         // Log all results of the SELECT statement
//         console.log(res);
//         connection.end();
//       });
//     }
// }

// function bid(){
//     inq.prompt([{
//         type: 'list',
//         name: 'bidlist',
//         message: "What would you like to bid on?",
//         choices: 
//     },
//     {
//         type: 'input',
//         name: 'bid',
//         message: "How much would you like to bid?",

//     }
// ]).then(function (answer) {
//     if (!answer) {
//         console.log('------------------------------------');
//         console.log("There was an error...Oops");
//         console.log('------------------------------------');
//     }

//     var item = answer.bidlist;
//     var newPrice = answer.price;
//     connection.query("INSERT INTO products SET ?", {
//             name: newItem,
//             bid: newPrice
//         },
//         function (err, res) {
//             console.log('------------------------------------');
//             console.log(res.affectedRows + "Product inserted!\n");
//             console.log('------------------------------------');
//         })



// });

// }







// function createProduct() {
//   console.log("Inserting a new product...\n");
//   var query = connection.query(
//     "INSERT INTO products SET ?",
//     {
//       flavor: "Rocky Road",
//       price: 3.0,
//       quantity: 50
//     },
//     function(err, res) {
//       console.log(res.affectedRows + " product inserted!\n");
//       // Call updateProduct AFTER the INSERT completes
//       updateProduct();
//     }
//   );

//   // logs the actual query being run
//   console.log(query.sql);
// }

// function updateProduct() {
//   console.log("Updating all Rocky Road quantities...\n");
//   var query = connection.query(
//     "UPDATE products SET ? WHERE ?",
//     [
//       {
//         quantity: 100
//       },
//       {
//         flavor: "Rocky Road"
//       }
//     ],
//     function(err, res) {
//       console.log(res.affectedRows + " products updated!\n");
//       // Call deleteProduct AFTER the UPDATE completes
//       deleteProduct();
//     }
//   );

//   // logs the actual query being run
//   console.log(query.sql);
// }

// function deleteProduct() {
//   console.log("Deleting all strawberry icecream...\n");
//   connection.query(
//     "DELETE FROM products WHERE ?",
//     {
//       flavor: "strawberry"
//     },
//     function(err, res) {
//       console.log(res.affectedRows + " products deleted!\n");
//       // Call readProducts AFTER the DELETE completes
//       readProducts();
//     }
//   );
// }

// function readProducts() {
//   console.log("Selecting all products...\n");
//   connection.query("SELECT * FROM products", function(err, res) {
//     if (err) throw err;
//     // Log all results of the SELECT statement
//     console.log(res);
//     connection.end();
//   });
// }
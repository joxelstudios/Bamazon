var mysql = require("mysql");
var inq = require("inquirer");
var cart = [];
var itemAmount = [];
var dbItem;

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

};

function amount() {
    inq.prompt([{
        type: 'text',
        name: 'amount',
        message: "How many would you like to buy?"
    }]).then(function (answer) {
        if (!answer.amount) {
            console.log('------------------------------------');
            console.log("Please enter an amount.");
            console.log('------------------------------------');
            choice();
        }
        itemAmount.push(answer.amount);
        console.log('------------------------------------');
        console.log("Added item(s) to cart!");
        console.log(cart);
        console.log(answer.amount);
        console.log('------------------------------------');
        checkInv();
    });

};


function choice() {
    cart = [];
    inq.prompt([{
        type: 'text',
        name: 'item',
        message: "What would you like to buy? Enter an ID"
    }]).then(function (answer) {
        if (!answer.item) {
            console.log('------------------------------------');
            console.log("Please enter an ID.");
            console.log('------------------------------------');
            choice();
        } else {
            cart.push(answer.item);
        }
        amount();
    });

};

function checkInv() {
    console.log('------------------------------------');
    console.log("Verifying inventory!");
    console.log('------------------------------------');

    connection.query("SELECT * FROM products", function (err, res) {
        dbItem = res[cart[0] - 1];
        if (Number(dbItem.quantity) >= Number(itemAmount)) {
            console.log(dbItem.quantity);
            console.log("We have enough! Your total is $" + dbItem.price * Number(itemAmount))

        } else {
            console.log("Woah! We don't have enough of those!!!")
            choice();
        }
        

    })
    confirmPurchase();

}

function confirmPurchase() {
    inq.prompt([{
        type: "confirm",
        name: "confirm",
        message: "Are you sure you want to make this purchase?",
    }]).then(function (answer) {
            if (answer.confirm === true) {
                connection.query("UPDATE products SET ? WHERE ?",
                [{
                        quantity: Number(dbItem.quantity) - Number(amount)
                    },
                    {
                        name: dbItem.name
                    }
                ],
        
            );

        }

    })

};









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

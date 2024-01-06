const mysql = require("mysql2");
const dbConnection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "viewdeeproject"
});

dbConnection.connect((err) => {
    if (err) throw err;
    console.log("dbConnected!")
});

module.exports = dbConnection;
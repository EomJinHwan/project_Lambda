// db.js
const mysql = require("mysql2");

const pool = mysql.createPool({
    host: "host",
    user: "dasom",
    password: "dpassword",
    database: "dasom_db",
    port: "3306",
})

module.exports = pool;
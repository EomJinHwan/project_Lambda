// ./db.js
const mysql = require("mysql2");

const pool = mysql.createPool({
    host: "dasom-project.c1owmo6m6xgg.ap-northeast-2.rds.amazonaws.com",
    user: "dasom",
    password: "dasom0628!",
    database: "dasom_db",
    port: "3306",
})

module.exports = pool;
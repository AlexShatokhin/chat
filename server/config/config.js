require("dotenv").config();
const mysql = require("mysql2/promise");

const pool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    database: process.env.NAME,
    password:process.env.PASSWORD
});
module.exports = pool;
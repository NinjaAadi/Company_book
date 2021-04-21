var mysql = require('mysql');

var pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "aaditya123",
  database: "client",
  connectionLimit: 151,
});

exports.pool = pool;

var mysql = require('mysql');

var pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "abc123",
  database: "client",
  connectionLimit: 10000,
});

exports.pool = pool;

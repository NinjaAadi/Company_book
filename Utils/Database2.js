var mysql = require('mysql');

var pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "mihir1996",
  database: "client",
  connectionLimit: 10000,
});

exports.pool = pool;

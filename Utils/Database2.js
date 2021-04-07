var mysql = require('mysql');

var pool  = mysql.createPool({
    host     : 'localhost',
    user     : 'root',
    password : 'aaditya123',
    database : 'client'
});

exports.pool = pool;

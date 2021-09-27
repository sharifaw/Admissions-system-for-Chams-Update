const mysql = require('mysql');



let connection = mysql.createPool({
    connectionLimit: 50,
    host: 'localhost',
    user: 'fash',
    password: 'Shfa98* ',
    database: 'Chams'
})


module.exports={connection}; 
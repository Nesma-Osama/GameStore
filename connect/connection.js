//connet to database file
const mysql2 = require('mysql2')
const db = mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    password:"password",
    database: 'gameverse'
})
db.connect()
module.exports = db.promise()//expoert this function

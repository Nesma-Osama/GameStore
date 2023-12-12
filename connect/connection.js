//connet to database file
const mysql2 = require('mysql2')
const db = mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Nesma2172003',
    database: 'Gamestore'
})
db.connect()
module.exports = db.promise()//expoert this function
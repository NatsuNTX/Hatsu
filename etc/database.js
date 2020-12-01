const {MongoClient} = require('salvage.db')
require('dotenv').config()

let dataBase = new MongoClient({
    mongoURI: process.env.DATABASE,
    schema: 'Hatsuku'
})

module.exports = dataBase
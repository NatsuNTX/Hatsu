const mongoose = require('mongoose');
const clr = require('chalk');
const {exit} = require('process')

function database(databaseURI) {
    try {
        mongoose.connect(databaseURI, {
            useNewUrlParser: true,
            useFindAndModify: true,
            poolSize: 8,
            autoReconnect: true
        });
        return console.log(clr.green('Connected to Database'))
    } catch (e) {
        console.log(clr.red('Something Wrong with Database!'));
        console.error(clr.red(e));
        exit(513);
    }
}
module.exports = database
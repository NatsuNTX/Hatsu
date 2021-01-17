const mongoose = require('mongoose');
const clr = require('chalk');
const {exit} = require('process');
const hatsuLog = require('./Hatsu Logger');

//Logger
const hatsuDebug = hatsuLog.getLogger("HatsuDebug");
const hatsuError = hatsuLog.getLogger("HatsuError");

function database(databaseURI) {
    try {
        mongoose.connect(databaseURI, {
            useNewUrlParser: true,
            useFindAndModify: true,
            poolSize: 8,
            autoReconnect: true

        });
        return hatsuDebug.debug('Connected to Database');
    } catch (e) {
        hatsuError.error('Something Wrong with Database!');
        hatsuError.error(e);
        exit(513);
    }
}
module.exports = database
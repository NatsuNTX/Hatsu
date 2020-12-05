//Libs
const clr = require('chalk');
const db = require('../etc/database');
const os = require('os');
//Calculate Total Ram
const ramSize = os.totalmem / 1073741824

module.exports = async (client) => {
    console.log(clr.cyan('Hatsu is Ready'));
    console.log(clr.cyan(`Hatsu is Running at ${client.readyAt}`));
    console.log(clr.cyan(`Platform:${os.platform} Arch:${os.arch}`));
    console.log(clr.cyan(`RAM:${ramSize.toFixed(2)}GB`));
    console.log(clr.cyan(`NodeJS:${process.version}`));
    console.log(clr.cyan(`Hatsu is Logged as:${client.user.username}`));
}
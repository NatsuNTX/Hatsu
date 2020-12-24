//Libs
const express = require('express'); //Express Module
const eprs = express();
const {ISC} = require('./stuff/license_data.json'); //License
const Hatsu = require('./Hatsu/hatsuku') //Get Client
const clr = require('chalk');
const {exit} = require('process')
require('dotenv').config(); //Env
const {ownerInfo} = require('./stuff/Hatsuku_Owner.json'); //Get Version

//Check "Hatsuku_Owner.json" Before Running
if (ownerInfo.name.length === 0 || ownerInfo.id.length === 0) {
    console.log(clr.red('Invalid Owner Info found!'));
    console.log(clr.red('Please Check if You Already Input the "Name" & "ID" in "Hatsuku_Owner.json"!'));
    exit(4);
}
if (isNaN(ownerInfo.id) === true || ownerInfo.id.length > 18 || ownerInfo.id.length < 18) {
    console.log(clr.red('Invalid Owner ID!'));
    console.log(clr.red('Please Input Correct Account ID & Make sure is 18 character!,No More No Less'));
    exit(6);
}
//Show License Notice
console.log(clr.green(ISC));

setTimeout(() => {


//Run Hatsuku
const hatsuku = new Hatsu({retryLimit: 14, messageCacheMaxSize: 720, messageSweepInterval: 120, restRequestTimeout: 8600, messageCacheLifetime: 76});

hatsuku.login(process.env.TOKEN);
//Express Code
eprs.get('/', (req, res) => {
    res.send('<h1>Hatsuku is Running</h1>' +
        '<p>Hemm You Found this Page but its ok!,this page show you the bot is successfuly Running</p>');
});
const prt = 4131
eprs.listen(prt);
console.log(`Server is Running on Port:${prt}`);
}, 5000)

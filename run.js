//Libs
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

//Run Hatsuku
const hatsuku = new Hatsu({retryLimit: 14, messageCacheMaxSize: 340, messageSweepInterval: 600, restRequestTimeout: 8600});

hatsuku.login(process.env.TOKEN);
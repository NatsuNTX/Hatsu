//Libs
const Hatsu = require('./Hatsu/hatsuku') //Get Client
require('dotenv').config(); //Env

//Run Hatsuku
const hatsuku = new Hatsu({retryLimit: 14, messageCacheMaxSize: 340, messageSweepInterval: 600, restRequestTimeout: 8600});

hatsuku.login(process.env.TOKEN);
//Libs
require('dotenv').config()
const hatsu = require('discord.js');
//const {ownerInfo} = require('../stuff/Hatsuku_Owner.json');
//Some Class inside ETC folder
const EHandler = require('../etc/EventHandler'); //Event Handler
const CMDHandler = require('../etc/Commands'); //Command Handler
const LV = require('../etc/Music Node'); //Lavalink Handler
const PLYCenter = require('../etc/Player Center'); //Player Center
const newDB = require('../etc/database'); //New Database Handler

/* Focus Mode  */
class Hatsuku extends hatsu.Client{
    constructor(hatsuOption) {
        super(hatsuOption);
        //Load Hatsuku Method
        newDB(process.env.DATABASE); //Database
        new EHandler(this); //EventHandler
        new CMDHandler(this); //CommandHandler
        this.nodeMusic = new LV(this); //Lavalink Handler
        this.playCenter = new PLYCenter(this); //PlayCenter
    }
    //Event List (Temporally!);

}

module.exports = Hatsuku
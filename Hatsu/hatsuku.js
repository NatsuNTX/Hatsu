//Libs
const hatsu = require('discord.js');
const clr = require('chalk');
const {ownerInfo} = require('../stuff/Hatsuku_Owner.json');
//Some Class inside ETC folder
const EHandler = require('../etc/EventHandler'); //Event Handler
const CMDHandler = require('../etc/Commands'); //Command Handler
const LV = require('../etc/Music Node'); //Lavalink Handler
const PLYCenter = require('../etc/Player Center'); //Player Center

//Some Function to Check the Json File
function validOwnerJson() {
    if (ownerInfo.name === undefined && ownerInfo.id === undefined) {
        console.log(clr.grey(`Owner Name:${ownerInfo.name}`));
        console.log(clr.grey(`Owner ID:${ownerInfo.id}`));
        console.log(clr.red('Opps... I Cant Run Because Some Setting Are Missing!'));
        console.log(clr.yellow('Please Check if You Already Fill ["name" & "ID"] in "stuff/Hatsuku_Owner.json"'));
        return;
    } else {
        console.log(clr.green(`Hello ${ownerInfo.name} Hope You Like Hatsuku! :)`))
    }
    if (isNaN(ownerInfo.id) === true && ownerInfo.id > 18 || ownerInfo.id < 18) {
        console.log(clr.red(`Opps... I think this (ID:${ownerInfo.id}) is Invalid!`));
        console.log(clr.yellow('Please Check if the ID is not contain any character and is 18 digit long!, no more/no less'));
        return;
    }
}

/* Focus Mode  */
class Hatsuku extends hatsu.Client{
    constructor(hatsuOption) {
        super(hatsuOption);
        //Run some Validation
        validOwnerJson();
        //Load Hatsuku Method
        new EHandler(this); //EventHandler
        new CMDHandler(this); //CommandHandler
        this.nodeMusic = new LV(this); //Lavalink Handler
        this.playCenter = new PLYCenter(this); //PlayCenter
    }
    //Event List (Temporally!);

}

module.exports = Hatsuku
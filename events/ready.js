//Libs
const clr = require('chalk');
require('dotenv').config()
const {ActivityList} = require('../stuff/bot_activity.json');
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
    //Idle,Online and INVICIBLE
    await client.user.setStatus('idle').catch(e => console.error(e));
    setTimeout(() =>{
        client.user.setActivity(`[${process.env.PREFIX}unk] | ONLINE!`).catch(e => console.error(e));
    },5000);
    setInterval(() => {
        client.user.setActivity(`[${process.env.PREFIX}unk] | ${activityList(ActivityList.List)}`)
    }, 30000);

    function activityList(actvlist) {
        return actvlist[Math.floor(Math.random() * (actvlist.length -1) + 1)]
    }
}
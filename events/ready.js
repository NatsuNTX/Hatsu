//Libs
const clr = require('chalk');
require('dotenv').config()
const {ActivityList, HatsukuStatus} = require('../stuff/bot_activity.json');
const os = require('os');
const {version} = require('../package.json');
const hatsukuLog = require('../etc/Hatsu Logger');

//Logger
const hatsuInfo = hatsukuLog.getLogger("HatsuInfo");
const hatsuError = hatsukuLog.getLogger("HatsuError")

//Calculate Total Ram
const ramSize = os.totalmem / 1073741824

module.exports = async (client) => {
    hatsuInfo.info('Hatsu is Ready');
    hatsuInfo.info(`Hatsu is Running at ${client.readyAt}`);
    hatsuInfo.info(`Hatsu Version:${version}`);
    hatsuInfo.info(`Platform:${os.platform} Arch:${os.arch}`);
    hatsuInfo.info(`RAM:${ramSize.toFixed(2)}GB`);
    hatsuInfo.info(`NodeJS:${process.version}`);
    hatsuInfo.info(`Hatsu is Logged as:${client.user.username}`);
    //Idle,Online and INVISIBLE
    await client.user.setStatus(`${HatsukuStatus}`).catch(e => hatsuError.error(e));
    setTimeout(() =>{
        client.user.setActivity(`[${process.env.PREFIX}help] | ONLINE!`).catch(e => hatsuError.error(e));
    },5000);
    setInterval(() => {
        client.user.setActivity(`[${process.env.PREFIX}help] | ${activityList(ActivityList.List)}`)
    }, 30000);

    function activityList(actvlist) {
        return actvlist[Math.floor(Math.random() * (actvlist.length -1) + 1)]
    }
}
//Libs
const {join} = require('path');
const {Collection} = require('discord.js');
const fs = require('fs');
const {exit} = require('process');
const hatsuLog = require('./Hatsu Logger');
//const hatsuEmbed = require('./HatsuEmbed');
const clr = require('chalk');
const prefix = require('../models/Model_Prefix');
//const nsfw = require('../models/Model_NSFW')
require('dotenv').config();

//Logger
const hatsuDebug = hatsuLog.getLogger("HatsuDebug");
const hatsuError = hatsuLog.getLogger("HatsuError");
const hatsuInfo = hatsuLog.getLogger("HatsuInfo");

class CommandHandler {
    constructor(client) {
        this.client = client
        this.client.collection = new Collection()
        this.cooldowns = new Collection()
        //Run the Method
        this.loadTheCommand()
        this.runTheCommand()
    }
    loadTheCommand() {
        const getCommand = fs.readdirSync(join(__dirname, '../commands/'), {encoding: 'utf-8'}).filter(files => files.endsWith('.js'));
        for (const command of getCommand) {
            const commands = require(join(__dirname, '../commands/', `${command}`))
            this.client.collection.set(commands.name, commands);
            hatsuDebug.debug(`Loading Commands [${commands.name}]`);
        }
    }
    runTheCommand() {
        this.client.on('message', async msg => {

            const prefixData = await prefix.findOne({
                //Find Guild ID in Database
                GuildID: msg.guild.id
            });

            //if Hatsu Find the GuildID than Try to Get the Prefix From Database

                let DBPrefix = prefixData ? prefixData.prefix.CustomPrefix : process.env.PREFIX
                //Set Prefix
                if (!msg.content.startsWith(DBPrefix) || msg.author.bot || !msg.guild) return
                const args = msg.content.slice(DBPrefix.length).trim().split(" ");
                //Make to LowerCase
                const commandName = args.shift().toLowerCase();

                const command =
                    this.client.collection.get(commandName) || this.client.collection.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
                if (!command) {
                    await msg.channel.send(`${msg.author} i Can't Find that Command!`);
                    console.log(clr.magenta(`Cannot Find Command:"${commandName}" Requested From: ${msg.guild.name} With ID:${msg.guild.id}`));
                    return
                }

                //Cooldowns Thing
                if (!this.cooldowns.has(command.name)) {
                    this.cooldowns.set(command.name, new Collection())
                }
                const now = Date.now();
                const timeStamp = this.cooldowns.get(command.name);
                const coolAmount = (command.cooldown || 1) * 1000;

                if (timeStamp.has(msg.author.id)) {
                    const expire = timeStamp.get(msg.author.id) + coolAmount
                    if (now < expire) {
                        const remaining = (expire - now) / 1000
                        return msg.reply(`Whoa..Whoa... its to fast!,Please wait for **${remaining.toFixed(0)} Second**, Before try to use ***${command.name}*** command again!`);
                    }
                }
                timeStamp.set(msg.author.id, now);
                setTimeout(() => timeStamp.delete(msg.author.id), coolAmount);

                //If User Mention the Bot than Send Some Bot Information
                try {
                    await command.execute(msg, args);
                    hatsuInfo.info(`Execute ${command.name} Command!`);
                } catch (e) {
                    hatsuError.error(`Something Wrong when try to Run ${command.name}!,Error:${e}`);
                    hatsuError.error(`Requested from ${msg.guild.name} With ID:${msg.guild.id}`);
                    hatsuError.error(e);
                    exit(261);
                }
        });
    }
}

module.exports = CommandHandler
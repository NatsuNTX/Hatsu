//Libs
const {join} = require('path');
const {Collection} = require('discord.js');
const fs = require('fs');
const {exit} = require('process');
const hatsuEmbed = require('./HatsuEmbed');
const clr = require('chalk');
const prefix = require('../models/Model_Prefix');
const nsfw = require('../models/Model_NSFW')
require('dotenv').config();

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
            console.log(clr.yellow(`Loading Commands:${commands.name}`))
        }
    }
    runTheCommand() {
        this.client.on('message', async msg => {

            const prefixData = await prefix.findOne({
                //Get Guild ID from Database
                GuildID: msg.guild.id
            });

            //if Hatsu Find the GuildID than Try to Get the Prefix From Database
            if (prefixData) {
                let DBPrefix = prefixData.prefix.CustomPrefix
                //Set Prefix
                if (!msg.content.startsWith(DBPrefix) || msg.author.bot ||!msg.guild) return
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

                //NSFW Checker
                const nsfwData = await nsfw.findOne({
                    GuildID: msg.guild.id
                });
                if (command.name === ["hentaineko", "hentai"] || command.aliases === "hneko"){
                    if (!nsfwData) {
                        const nsfwVerify = new hatsuEmbed({
                           title: 'NSFW Command Verification',
                           color: "AQUA",
                           description: `Looks like this is the **first time** this command has been run in this guild, before I can execute that command, I have to get permission from the ***guild owner*** first!, if you are a guild owner please type ***${DBPrefix}nsfw auth*** to verify!`,
                           thumbnail: {url: this.client.user.displayAvatarURL({dynamic: true,size:512,format:"jpeg"})}
                        });
                        return msg.channel.send(nsfwVerify);
                    } else {
                        const allowNSFW = nsfwData.allowNSFW
                        switch (allowNSFW) {
                            case false:
                                return msg.reply('NSFW Command is **Disable** for This Guild');
                        }
                    }
                }

                //If User Mention the Bot than Send Some Bot Information
                try {
                    await command.execute(msg, args, );
                    console.log(clr.blue(`Execute ${commandName} Command!`));
                } catch (e) {
                    console.log(clr.red(`Something Wrong when try to Run ${commandName}!,Error:${e}`));
                    console.log(clr.red(`Requested from ${msg.guild.name} With ID:${msg.guild.id}`));
                    console.error(e);
                    exit(261);
                }
            } else {
                let DBPrefix = process.env.PREFIX
                //Set Prefix
                if (!msg.content.startsWith(DBPrefix) || msg.author.bot ||!msg.guild) return
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
                        return msg.reply(`Whoa..Whoa... its to fast!,Please wait for **${remaining.toFixed(0)}** Second, Before try to use ***${command.name}*** command again!`);
                    }
                }
                timeStamp.set(msg.author.id, now);
                setTimeout(() => timeStamp.delete(msg.author.id), coolAmount);
                //NSFW Checker
                const nsfwData = await nsfw.findOne({
                    GuildID: msg.guild.id
                });
                if (command.name === ["hentaineko", "hentai"] || command.aliases === "hneko"){
                    if (!nsfwData) {
                        const nsfwVerify = new hatsuEmbed({
                            title: 'NSFW Command Verification',
                            color: "AQUA",
                            description: `Looks like this is the **first time** this command has been run in this guild, before I can execute that command, I have to get permission from the ***guild owner*** first!, if you are a guild owner please type ***${DBPrefix}nsfw auth*** to verify!`,
                            thumbnail: {url: this.client.user.displayAvatarURL({dynamic: true,size:512,format:"jpeg"})}
                        });
                        return msg.channel.send(nsfwVerify);
                    } else {
                        const allowNSFW = nsfwData.allowNSFW
                        switch (allowNSFW) {
                            case false:
                                return msg.reply('NSFW Command is **Disable** for This Guild');
                        }
                    }
                }
                //If User Mention the Bot than Send Some Bot Information
                try {
                    await command.execute(msg, args);
                    console.log(clr.blue(`Execute ${commandName} Command!`));
                } catch (e) {
                    console.log(clr.red(`Something Wrong when try to Run ${commandName}!,Error:${e}`));
                    console.log(clr.red(`Requested from ${msg.guild.name} With ID:${msg.guild.id}`));
                    console.error(e);
                    exit(261);
                }
            }
        });
    }
}

module.exports = CommandHandler
//Libs
const {join} = require('path');
const {Collection} = require('discord.js');
const fs = require('fs');
const {exit} = require('process');
const hatsuLog = require('./Hatsu Logger');
const hatsuEmbed = require('./HatsuEmbed');
const clr = require('chalk');
const prefix = require('../models/Model_Prefix');
const nsfw = require('../models/Model_NSFW')
require('dotenv').config();

//Logger
const hatsuDebug = hatsuLog.getLogger("HatsuDebug");
const hatsuError = hatsuLog.getLogger("HatsuError");
const hatsuInfo = hatsuLog.getLogger("HatsuInfo");
const hatsuWarn = hatsuLog.getLogger("HatsuWarn");

class CommandHandler {
    constructor(client) {
        this.client = client
        this.client.collection = new Collection();
        this.cooldowns = new Collection();
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

            //if User mentioning the Bot
            if (msg.mentions.has(this.client.user.id)) return msg.channel.send(`Hello ${msg.author} What can i Do For You Today?`);

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
                const coolAmount = (command.cooldown || 0) * 1000;

                if (timeStamp.has(msg.author.id)) {
                    const expire = timeStamp.get(msg.author.id) + coolAmount
                    if (now < expire) {
                        const remaining = (expire - now) / 1000
                        return msg.reply(`Whoa..Whoa... its to fast!,Please wait for **${remaining.toFixed(0)} Second**, Before try to use ***${command.name}*** command again!`);
                    }
                }
                timeStamp.set(msg.author.id, now);
                setTimeout(() => timeStamp.delete(msg.author.id), coolAmount);

            //NSFW Authentication
            //Check if NSFW is Present in Database
            const nsfwGuild = await nsfw.findOne({
                GuildID: msg.guild.id
            });
            const commandNSFW = (command.NSFW);
            if (commandNSFW) {
                //Check if NSFW Commands is Allow to Use in the Guild
                if (!nsfwGuild) {
                    hatsuWarn.warn(`Cannot Found NSFW Data for this Guild ID:${msg.guild.id} | ${msg.guild.name}`);
                    const nsfwEmbed = new hatsuEmbed({
                        title: 'NSFW Authentication',
                        description: require('../stuff/Nsfw Prompt Message.json').NSFWPROMPT,
                        thumbnail: {url:'https://res.cloudinary.com/datasave/image/upload/e_auto_contrast/v1611445737/Data/hatsuku/thumbnail/NSFW_Warn_xgh3zj.png'}
                    })
                    return msg.channel.send(nsfwEmbed)
                } else {
                    if(nsfwGuild.allowNSFW) {
                        //Check if Message Channel is Set to NSFW Only
                        const isNSFWChannel = msg.channel.nsfw
                        if (!isNSFWChannel) return msg.reply("I Can't Let you use this Command in **Public** Chat :/")
                    } else {
                        msg.reply("Sorry..., But NSFW Commands is ***Disable*** in this Guild!");
                        msg.channel.send('https://media1.tenor.com/images/960151a0c15fefd51e008e45e59486f9/tenor.gif?itemid=14108963')
                        return
                    }
                }
            }


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
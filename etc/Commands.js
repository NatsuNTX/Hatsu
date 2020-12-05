//Libs
const {join} = require('path');
const {Collection} = require('discord.js');
const fs = require('fs');
const {exit} = require('process')
const clr = require('chalk');
const prefix = require('../models/Model_Prefix')
require('dotenv').config();

class CommandHandler {
    constructor(client) {
        this.client = client
        this.collection = new Collection();
        //Run the Method
        this.loadTheCommand()
        this.runTheCommand()
    }
    loadTheCommand() {
        const getCommand = fs.readdirSync(join(__dirname, '../commands/'), {encoding: 'utf-8'}).filter(files => files.endsWith('.js'));
        for (const command of getCommand) {
            const commands = require(join(__dirname, '../commands/', `${command}`))
            this.collection.set(commands.name, commands);
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
                    this.collection.get(commandName) || this.collection.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
                if (!command) {
                    await msg.channel.send(`${msg.author} i Can't Find that Command!`);
                    console.log(clr.magenta(`Cannot Find Command:"${commandName}" Requested From: ${msg.guild.name} With ID:${msg.guild.id}`));
                    return
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
            } else {
                let DBPrefix = process.env.PREFIX
                //Set Prefix
                if (!msg.content.startsWith(DBPrefix) || msg.author.bot ||!msg.guild) return
                const args = msg.content.slice(DBPrefix.length).trim().split(" ");
                //Make to LowerCase
                const commandName = args.shift().toLowerCase();

                const command =
                    this.collection.get(commandName) || this.collection.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
                if (!command) {
                    await msg.channel.send(`${msg.author} i Can't Find that Command!`);
                    console.log(clr.magenta(`Cannot Find Command:"${commandName}" Requested From: ${msg.guild.name} With ID:${msg.guild.id}`));
                    return
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
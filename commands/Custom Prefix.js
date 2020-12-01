//Libs
const db = require('../etc/database')
const hatsuEmbed = require('../etc/HatsuEmbed'); //EMBED

require('dotenv').config()

module.exports = {
    name: 'prefix',
    aliases: ["pfx"],
    description: 'Set Your Own Custom Prefix',
    async execute(msg, args) {
        //Check if the User Has Manage_Server Permission or administrator
        if (!msg.member.permissions.has('MANAGE_GUILD')) return await msg.channel.send(`${msg.author} Nope... Nope... its to dangers`), await msg.channel.send(`https://tenor.com/view/nope-anime-no-gif-15075442`);
        //if Nothing is input tell the user to input a new prefix
        if (!args[0]) return msg.channel.send(`${msg.author} Please Input The Prefix you Wanna Use!, Current Prefix is **"${await db.get(`Prefix_${msg.guild.id}`) ? await db.get(`Prefix_${msg.guild.id}`) : process.env.PREFIX}"**`);
        /*
        await db.get(`prefix_${msg.guild.id}`) ? await db.get(`prefix_${msg.guild.id}`) : process.env.PREFIX
        */
        if (args[0] === 'help') {
            let prfHelp = new hatsuEmbed({
                title: 'Prefix Command',
                description: 'to set the prefix for your guild, just type `>prefix [new Prefix]`',
                color: "AQUA"
            });
            return msg.channel.send(prfHelp);
        }
        //Now set the Prefix
        await db.set(`Prefix_${msg.guild.id}`, args[0]);
        await msg.channel.send(`:white_check_mark: Set the Prefix for **${msg.guild.name}** to ${args[0]}`);
    }
}
//Libs
const PrefixModel = require('../models/Model_Prefix'); //PREFIX MODEL

require('dotenv').config()

module.exports = {
    name: 'prefix',
    aliases: ["pfx"],
    cooldown: 60,
    description: 'Set Your Own Custom Prefix',
    async execute(msg, args) {

        //Check if the User Has Manage_Server Permission or administrator
        if (!msg.member.permissions.has('MANAGE_GUILD') || msg.author.id != msg.guild.ownerID) return await msg.channel.send(`${msg.author} Nope... Nope... its to dangers`), await msg.channel.send(`https://tenor.com/view/nope-anime-no-gif-15075442`);
        const prfxData = await PrefixModel.findOne({
            GuildID: msg.guild.id
        });
        let currentPrf = []
        if (!prfxData) {
            //if No Data than Put Default Prefix to Array
            currentPrf.push(process.env.PREFIX);
        } else {
            //if found a Data than Put the Custom Prefix to Array
            currentPrf.push(prfxData.prefix.CustomPrefix);
        }
        //if No Prefix is Input than Show Prefix inside "currentPrf" variable
        if (!args[0]) return msg.channel.send(`${msg.author} Please Input The Prefix you Wanna Use!, Current Prefix is **"${currentPrf}"**`);

        //if User Input More than 3 Character than tell them to not put more than 3 Character
        if (args[0].length > 3) return msg.channel.send(`:warning: ${msg.author} You Can't Make Prefix more than 3 Character!`);

        if (prfxData){
            await PrefixModel.findOneAndRemove({
                GuildID: msg.guild.id
            });
            await msg.channel.send(`:white_check_mark: Set the Prefix for **${msg.guild.name}** to ${args[0]}`);

            let newPrefix = new PrefixModel({
                GuildName: msg.guild.name,
                prefix: {
                    CustomPrefix: args[0],
                },
                GuildID: msg.guild.id
            });
            await newPrefix.save();
        } else {
            await msg.channel.send(`:white_check_mark: Set the Prefix for **${msg.guild.name}** to ${args[0]}`);

            let newPrefix = new PrefixModel({
                GuildName: msg.guild.name,
                prefix: {
                    CustomPrefix: args[0],
                },
                GuildID: msg.guild.id
            });
            await newPrefix.save();
        }



        /*
        //if Nothing is input tell the user to input a new prefix
        if (!args[0]) return msg.channel.send(`${msg.author} Please Input The Prefix you Wanna Use!, Current Prefix is **"${}"**`);
        if (args[0] === 'help') {
            let prfHelp = new hatsuEmbed({
                title: 'Prefix Command',
                description: 'to set the prefix for your guild, just type `>prefix [new Prefix]`',
                color: "AQUA"
            });
            return msg.channel.send(prfHelp);
        }
        //Now set the Prefix
        await msg.channel.send(`:white_check_mark: Set the Prefix for **${msg.guild.name}** to ${args[0]}`);
        */
    }
}
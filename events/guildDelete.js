//Libs
const clr = require('chalk');

module.exports = async (client, guild) => {
    console.log(clr.gray(`Hatsu get Leave from:${guild.channels.guild.name} | ${guild.channels.guild.id} | Shard:${guild.channels.guild.shard.id}`))
}
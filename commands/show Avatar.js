//libs
const hatsuEmbed = require('../etc/HatsuEmbed'); //Embed

module.exports = {
    name: 'showavatar',
    aliases: ['pr', 'pp', 'sa'],
    description: 'Show Avatar from another member or YourSelf',
    execute(msg) {
        if (!msg.mentions.users.first()) {
            let embed = new hatsuEmbed({
                title: `Avatar for ${msg.author.username}`,
                image: {url: msg.author.displayAvatarURL({dynamic: true, format: "webp", size: 512})},
                color: "AQUA"
            });
            return msg.channel.send(embed);
        } else {
            let mentionUser = msg.mentions.users.first();
            let embed = new hatsuEmbed({
                title: `Avatar for ${mentionUser.username}`,
                image: {url: mentionUser.displayAvatarURL({dynamic: true, size:512, format: "webp"})},
                color: "AQUA"
            });
            return msg.channel.send(embed);
        }
    }
}
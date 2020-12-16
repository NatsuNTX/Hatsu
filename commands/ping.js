const hatsuEmbed = require('../etc/HatsuEmbed'); //Embeddd

module.exports = {
    name: 'ping',
    aliases: ['ping'],
    cooldown: 5,
    description: 'Check latency Betwen Your Server and Me',
    execute(msg) {
    msg.channel.send('Checking Latency').then(update => {
        let updateEmbed = new hatsuEmbed({
            title: `:signal_strength: Latency Between ***${msg.guild.name}*** and Me`,
            thumbnail: {url: msg.client.user.displayAvatarURL({dynamic: true, format: "webp", size: 512})},
            color: 'AQUA',
            description: `Commands:**${Math.round(update.createdTimestamp - msg.createdTimestamp)}ms**\n` + `Gateway:**${Math.round(msg.guild.shard.ping)}ms**`
        });
        update.edit('', {embed: updateEmbed});
    })
    }
}
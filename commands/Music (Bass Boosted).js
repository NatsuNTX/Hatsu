const BasSet = require('../stuff/eq/Bass/Bass_Settings.json').bSet
module.exports = {
    name: "bassboosted",
    aliases: ["bass"],
    cooldown : 6,
    description: 'Give You More BASSS',
    async execute(msg, args) {
        if (!msg.member.voice.channel) return msg.reply("Please Join Voice Channel First and Than Try Again");
        //Usually i Use PlayerCenter to Get the Player
        //for now i just gonna use .GetPlayer() from Node Modules to Get Player
        const player = msg.client.nodeMusic.getPlayer(msg.guild.id);
        //Nothing is Playing than Ignore it
        if(!player) {
            return msg.reply("I'Cant Do that for You,Because Nothing Is Playing!");
        } else {
            const basMode = args[0]
            switch(basMode) {
                case "low":
                    await player.setEqualizer(BasSet[0].Low);
                    msg.channel.send("Bass is Set to ***Low***, Safe for Your Ear");
                    break;
                case "medium":
                    await player.setEqualizer(BasSet[0].Med);
                    msg.channel.send("Bass is Set to ***Medium***, Recommend To Use Your Speakers");
                    break;
                case "high":
                    await player.setEqualizer(BasSet[0].Max);
                    msg.channel.send("Bass is Set to ***MAX***, Enjoy the Punch from the BAAASSSS");
                    break;
                case "off":
                    await player.setEqualizer(BasSet[0].Off);
                    msg.channel.send("Bass is Now ***Off***");
                    break;
                default:
                    msg.reply("Please Type **[low/medium/high/off]** To Set Bass Mode!");
            }
        }
    }
}
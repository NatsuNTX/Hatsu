module.exports = {
    name: 'skip',
    aliases: ["skp"],
    description: "Skip Current Music",

    async execute(msg) {
        //User try to use outside voice channel
        if (!msg.member.voice.channelID) return msg.channel.send(`:x: ${msg.author} You ***Cannot*** use this command outside ***VoiceChannel***!`);
        //get PlayerCenter
        let playerCenter = msg.client.playCenter.get(msg.guild.id);
        //The user trigger this command in different Voice Channel
        if (playerCenter.player.voiceConnection.voiceChannelID !== msg.member.voice.channelID) return msg.channel.send(`:question: Where Are You ${msg.author}?`);
        //lets skip it
        await msg.channel.send(`**Skipping:** ***${playerCenter.current.info.title}*** :thumbsup:`);
        await playerCenter.player.stopTrack();
    }
}
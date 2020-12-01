module.exports = {
    name: 'stop',
    aliases: ['stp'],
    description: 'Stop Current Music',
    async execute(msg) {
        //User try to use outside voice channel
        if (!msg.member.voice.channelID) return msg.channel.send(`:warning: ${msg.author} You ***Cannot*** use this command outside ***VoiceChannel***!`);
        //Get Player from PlayerCenter for Specific guild
        const playerCenter = msg.client.playCenter.get(msg.guild.id);
        //if Nothing is Playing than send a Warn
        if (!playerCenter) return msg.channel.send(`:no_entry_sign: ${msg.author} I cant Use that Command Because Nothing is playing`);
        //The user trigger this command in different Voice Channel
        if (playerCenter.player.voiceConnection.voiceChannelID !== msg.member.voice.channelID) return msg.channel.send(`:question: Where Are You ${msg.author}?`);
        //Stop the Music
        await msg.channel.send(`:stop_button: Stopping ***${playerCenter.current.info.title}***`);
        playerCenter.queue.length = 0
        await playerCenter.player.stopTrack();
    }
}
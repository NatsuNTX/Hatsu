module.exports = {
    name: 'paused',
    aliases: ["pause"],
    description: 'Paused Current Music',
    async execute(msg) {
        //No One in the voice channel
        if (!msg.member.voice.channel) return msg.channel.send(`:x: ${msg.author} You ***Cannot*** use this command outside ***VoiceChannel***!`);
        //Get Player Center
        let playerCenter = msg.client.playCenter.get(msg.guild.id);
        //if User Trigger from different Voice Channel
        if (playerCenter.player.voiceConnection.voiceChannelID !== msg.member.voice.channelID) return msg.channel.send(`:question: Where Are You ${msg.author}?`);
        //if Nothing is Playing Ignore it
        if (!playerCenter) return msg.channel.send(`:exclamation: ${msg.author} I cant Use that Command Because Nothing is playing`);
        //check if user is already pause the player
        const isPause = playerCenter.player.paused
        switch (isPause) {
            case true:
                await msg.channel.send(`:warning: uuhhh ${msg.author}, the player is **already** Paused!`);
                break
            case false:
                //Now Paused!
                await msg.channel.send(':pause_button: Player Has Been **Pause!**');
                await playerCenter.player.setPaused(true);
                break
        }
    }
}
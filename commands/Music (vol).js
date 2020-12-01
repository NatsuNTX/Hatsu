module.exports = {
    name: 'volume',
    aliases: ["vol"],
    description: "Adjust Volume for Player",

    async execute(msg, args) {
        //User try to use outside voice channel
        if (!msg.member.voice.channelID) return msg.channel.send(`:warning: ${msg.author} You ***Cannot*** use this command outside ***VoiceChannel***!`);
        //Get Player from PlayerCenter for Specific guild
        const playerCenter = msg.client.playCenter.get(msg.guild.id);
        //if Nothing is Playing than send a Warn
        if (!playerCenter) return msg.channel.send(`:x: ${msg.author} I cant Use that Command Because Nothing is playing`);
        //The user trigger this command in different Voice Channel
        if (playerCenter.player.voiceConnection.voiceChannelID !== msg.member.voice.channelID) return msg.channel.send(`:question: Where Are You ${msg.author}?`);
        //if User just Input the command name not a value, show the current volume instead
        if (!args[0] || isNaN(args[0])) {
            await msg.channel.send(`:sound: ${msg.author} The Current Volume for this player is **${playerCenter.player.volume}%**`);
            return msg.channel.send(':sound: Use **>vol [volume]** to set the volume');
        }
        //Make Sure its User Input the Number
        const volume = Number(args[0]);
        //To Low
        if (volume < 10) {
            return msg.channel.send(`:dog: ${msg.author} Hemm... You know what, Your are likes a dog`);
        }
        //To High
        if (volume > 250) {
            return msg.channel.send(`:exclamation: ${msg.author} You Need to Go to doctor right Now!`);
        }
        //Adjust the Volume
        await playerCenter.player.setVolume(volume);
        await msg.channel.send(`:white_check_mark: Volume has been Set to **${volume}%** ***ENJOY!***`);
    }
}
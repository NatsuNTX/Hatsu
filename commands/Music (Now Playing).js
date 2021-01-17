const simpleYtApi = require('simple-youtube-api'); //YT API
const embed = require('../etc/HatsuEmbed'); //Embed
const clr = require('chalk');
require('dotenv').config()

//Initialize YoutubeAPI
const yt = new simpleYtApi(process.env.YT_API);

module.exports = {
    name: 'nowplaying',
    aliases: ["np"],
    description: 'See What Music is Currently Playing',
    cooldown: 4,
    async execute(msg) {
        const sendback = msg.channel
        //Check if user is connected to the same voiceChannel
        if (!msg.member.voice.channelID) return msg.channel.send(`:x: ${msg.author} You ***Cannot*** use this command outside ***VoiceChannel***!`);
        //Get Player
        const playCenter = msg.client.playCenter.get(msg.guild.id);

        sendback.startTyping(4);
        sendback.send('***Getting Track Info...***')
            .then(c => {
                yt.getVideo(playCenter.current.info.uri)
                    .then(ytData => {
                        //Function to Trim Character
                        function trimString(str, maxLength) {
                            return((str.length > maxLength) ? `${str.slice(0, maxLength - 3)}...` : str);
                        }
                        const playing = new embed({
                            title: `Playing:${playCenter.current.info.title}`,
                            thumbnail: {url: ytData.thumbnails.maxres.url},
                            fields:[
                                {name:'Title:', value: `${playCenter.current.info.title}`, inline: true},
                                {name:'Artis/Channel:', value: `${ytData.channel.title}`, inline: true},
                                {name:'Track Length:', value: `${ytData.duration.minutes}` + `:` + `${ytData.duration.seconds}`},
                                {name:'Description:', value: `${trimString(ytData.description, 1024)}`},
                            ]
                        });
                        c.edit('', {embed: playing}).catch(e => {
                            console.error(e);
                            c.edit('**Oppss..., Something when Wrong while Trying to Display Track Information :(**');
                        });
                    });
            });
        sendback.stopTyping(true);
    }
}
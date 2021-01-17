//Libs
const PlayControl = require('../etc/Player Control'); //Player Control
const clr = require('chalk');
const hatsuLog = require('../etc/Hatsu Logger');

//Logger
const hatsuNodeDebug = hatsuLog.getLogger("HatsuMusicDebug");

class PlayerCenter extends Map {
    constructor(client, opts) {
        super(opts);
        this.client = client
    }
        //handle Music Request
        async handle(node, track, msg)
        {
            const exist = this.get(msg.guild.id);
            if (!exist) {
                const player = await node.joinVoiceChannel({
                    deaf: true,
                    guildID: msg.guild.id,
                    voiceChannelID: msg.member.voice.channelID
                });
                hatsuNodeDebug.debug(`Connection Successfully Make on ${msg.guild.name}`);
                const PlayCtrl = new PlayControl({
                    client: this.client,
                    guild: msg.guild,
                    messageText: msg.channel,
                    anotherMessage: msg,
                    player
                });
                //Put it to the Queue
                PlayCtrl.queue.push(track);
                this.set(msg.guild.id, PlayCtrl);
                return PlayCtrl
            }
            exist.queue.push(track);
            return null;
        }
}

module.exports = PlayerCenter
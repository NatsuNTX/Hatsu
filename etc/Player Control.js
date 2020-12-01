//libs
const clr = require('chalk'); //Text Color

class PlayerControl {
    constructor(opts) {
        this.client = opts.client
        this.player = opts.player
        this.queue = [] //This is Where Song Data is Save Before Playing
        this.guild = opts.guild
        this.messageText = opts.messageText
        this.anotherMessage = opts.anotherMessage
        this.current = null

        //When Player is Start Playing Something
        this.player.on('start', () => {
            this.messageText.send(`:musical_note: Now Playing:***${this.current.info.title}*** [Requested by:**${this.anotherMessage.author}**]`).catch(() => null);
        });
        //When Player is Finish Playing
        this.player.on('end', () => {
            this.play()
                .catch(error => {
                    this.queue.length = 0
                    this.PlayerShutdown();
                    console.error(error);
                });
        });
        //Get Error While Playing
        this.player.on('trackException', (reason) => {
            console.log(clr.red(`Something Wrong with Track!:${reason}`));
            this.messageText.send('`Something went wrong while trying to play a track! :(`')
            this.PlayerShutdown();
        });
        for (const playerEvent of ['closed', 'error', 'nodeDisconnect']) {
            this.player.on(playerEvent, data => {
                if (data instanceof Error || data instanceof Object) console.log(clr.yellow(data));
                this.queue.length = 0;
                this.PlayerShutdown();
            })
        }
    }
    //Check if Player is Still being use
        get stillThere() {
            return this.client.playCenter.has(this.guild.id)
        }
    //Play the Music Function
    async play() {
        if (!this.stillThere || !this.queue.length) return this.PlayerShutdown()
        this.current = this.queue.shift()
        await this.player.playTrack(this.current.track);
    }

        PlayerShutdown(reason) {
            console.log(clr.yellow(this.constructor.name, `Destroy the Player on guild ${this.guild.name} | ${this.guild.id}`));
            if (reason) console.log(clr.yellow(this.constructor.name, reason));
            this.queue.length = 0;
            this.player.disconnect();
            console.log(clr.yellow(this.player.constructor.name, `Destroy the Connection on guild ${this.guild.name} | ${this.guild.id}`));
            this.client.playCenter.delete(this.guild.id);
            this.messageText.send('END!., Hope you Enjoy the Music :slight_smile:');
        }
}

module.exports = PlayerControl
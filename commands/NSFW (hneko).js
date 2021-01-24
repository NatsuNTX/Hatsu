//Libs
const clr = require('chalk')// Text Color
const nekos = require('nekos.life'); //Neko Wrapper
const hatsuEmbed = require('../etc/HatsuEmbed'); //Embed

//Initialize Neko Module
const Neko = new nekos();

module.exports = {
    name: 'hentaineko',
    aliases: ['hneko'],
    NSFW: true,
    cooldown: 6,
    description: '[NSFW] Give You ERONEKO',
    async execute(msg) {
        //For Simple
        const sendBack = msg.channel
        /*
        This Method to Check if the Channel is NSFW or Not is Already Add to Command Handler
        //Check if The Channel is NSFW Channel or Not
        const isNSFW = msg.channel.nsfw
         */

        //Generate Random Number Between 1 - 3
        const randomNum = Math.floor(Math.random() * (4 - 1) + 1);

                //Execute from the Given Number
                try {
                    switch (randomNum) {
                        case 1:
                            sendBack.send('Loading ***Hentaineko***').then(c => {
                                Neko.nsfw.neko().then(res => {
                                const hNeko = new hatsuEmbed({
                                    description: `${msg.author},Please dont tell my Master ok~ hihi~~`,
                                    color: "#2455ae",
                                    image: {url: res.url}
                                });
                                    c.edit('', {embed: hNeko});
                                });
                            });
                            break
                        case 2:
                            sendBack.send('Loading ***Hentaineko***').then(c => {
                                Neko.nsfw.eroNeko().then(res => {
                                const hNeko = new hatsuEmbed({
                                    description: `${msg.author},Please dont tell my Master ok~ hihi~~`,
                                    color: "#2455ae",
                                    image: {url: res.url}
                                });
                                    c.edit('', {embed: hNeko});
                                });
                            });
                            break
                        case 3:
                            sendBack.send('Loading ***Hentaineko***').then(c => {
                                Neko.nsfw.nekoGif().then(res => {
                                const hNeko = new hatsuEmbed({
                                    description: `${msg.author},Please dont tell my Master ok~ hihi~~`,
                                    color: "#2455ae",
                                    image: {url: res.url}
                                });
                                    c.edit('', {embed: hNeko});
                                });
                            });
                            break
                    }
                } catch (e) {
                    sendBack.reply('Something Wrong that Prevent me to load the Image :(');
                    console.log(clr.red(`Something While trying to load a Image,${e}`));
                }
        }
}
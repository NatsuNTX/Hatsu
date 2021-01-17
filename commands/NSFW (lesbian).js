//Libs
const nekos = require('nekos.life'); //Neko Wrapper
const hatsuEmbed = require('../etc/HatsuEmbed'); //Embed

//Initialize Neko Module
const Neko = new nekos();


module.exports = {
    name: 'hentailesbian',
    aliases: ["hlesbi"],
    description: '[NSFW]:Give Hentai Lesbian',
    async execute(msg) {
        const sendBack = msg.channel
        //Check if The Channel is NSFW Channel or Not
        const isNSFW = msg.channel.nsfw
        if (isNSFW) {
            sendBack.startTyping();
            sendBack.send('Loading ***Lesbian...***').then(c => {
                Neko.nsfw.lesbian().then(res => {
                    const h = new hatsuEmbed({
                        description: `${msg.author}, ***Please dont tell my Master ok~ hihi~~***`,
                        color: "#2455ae",
                        image: {url: res.url}
                    });
                    c.edit('', {embed: h});
                    sendBack.stopTyping();
                });
            });
        } else{
            return msg.reply("I Can't Let you use this Command in **Public** Chat :/")
        }
    }
}
//Libs
const clr = require('chalk')// Text Color
const nekos = require('nekos.life'); //Neko Wrapper
const hatsuEmbed = require('../etc/HatsuEmbed'); //Embed
const neko = new nekos();

module.exports = {
    name: 'neko',
    description: 'Give You Neko :)',
    aliases: [""],
    cooldown: 5,
    async execute(msg) {
        //Generate Random Number Between 1 and 2
        let randomNumber = Math.floor(Math.random() * (3 - 1) + 1)

        msg.channel.send('***Loading Neko....***').then(c => {
            try {
            switch (randomNumber) {
                //Execute this Function when the number is 1
                case 1:
                    neko.sfw.neko().then(res => {
                        const neko = new hatsuEmbed({
                            title: `Neko [${msg.author.username}]`,
                            color: "AQUA",
                            image: {url: res.url}
                        });
                        c.edit('', {embed: neko});
                    });
                    break
                //Execute this Function when the number is 2
                case 2:
                    neko.sfw.nekoGif().then(res => {
                        const neko = new hatsuEmbed({
                            title: `Neko [${msg.author.username}]`,
                            color: "AQUA",
                            image: {url: res.url}
                        });
                        c.edit('', {embed: neko});
                    });
                }
            //Catch Error
            } catch (e) {
                msg.channel.send(`${msg.author} Opps Something Wrong when i try to load the Image!,Please Try Again Later`);
                console.log(clr.red(`Cannot Load Neko:${e}`));
            }
        });
    }
}
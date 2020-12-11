//Libs
const clr = require('chalk')// Text Color
const nekos = require('nekos.life'); //Neko Wrapper
const hatsuEmbed = require('../etc/HatsuEmbed'); //Embed

//Initialize Neko Module
const Neko = new nekos();

module.exports = {
    name: 'baka',
    aliases: [""],
    description: 'Say Baka to Someone?',
    async execute(msg) {

        //Check if User is Mentioning Someone!
        //if not than tell the to mention someone!
        const userMention = msg.mentions.members.first(); //Create a Variable where the Mention User is Store
        //Now Checking
        if (!userMention) {
            return msg.reply('You Need to **Mention** Someone to Use it!');
        } else {
            const bakaaaa = Neko.sfw.baka();
            const bakaaaaEmbed = new hatsuEmbed({
                title: `${userMention.displayName}, BAAAAKAAAAAAAAAAAAA~~`,
                color: "DARK_ORANGE",
                image: {url: `${(await bakaaaa).url}`}
            });
            await msg.channel.send(bakaaaaEmbed);
        }
    }

}
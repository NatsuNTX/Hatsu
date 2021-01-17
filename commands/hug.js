//libs
const embed = require('../etc/HatsuEmbed');
const asuna = require('../asuna/asuna');

const Asuna = new asuna();

module.exports = {
    name: 'hug',
    aliases: [""],
    cooldown: 4,
    description: "Hug Someone or Me :)",
    execute(msg){
        const sendback = msg.channel
        const mentionUser = msg.mentions.users.first();
        //if User is Not Mention Someone than they want to Hug ME
        if(!mentionUser) {
            sendback.startTyping();
            Asuna.asunaImg('hug').then(image => {
                const hugMe = new embed({
                    description: `***hihi~~ ${msg.author}***`,
                    image: {url: image},
                });
                sendback.send(hugMe);
            })
            sendback.stopTyping();
        } else {
            //if User is Mention Someone than Hug the Mention User
            sendback.startTyping();
            Asuna.asunaImg('hug').then(image => {
                const hugSomeone = new embed({
                    description: `***${msg.author} hugs ${mentionUser}***`,
                    image: {url: image},
                });
                sendback.send(hugSomeone);
            });
            sendback.stopTyping();
        }
    }
}
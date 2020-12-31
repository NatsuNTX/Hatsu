//Libs
const embed = require('../etc/HatsuEmbed');
const asuna = require('../asuna/asuna');
const Asuna = new asuna();

module.exports = {
    name: 'kiss',
    aliases: [""],
    cooldown: 4,
    description: 'Kiss Someone or me :)',
    async execute(msg) {
        const sendback = msg.channel

        //if User is Not Mention Any User then is try to Kiss Me
        if(!msg.mentions.users.first()) {
            sendback.startTyping();
            Asuna.asunaImg("kiss").then(image => {
                const kissMe = new embed({
                    description: `***Aaahhh ${msg.author} :smiling_face_with_3_hearts:***`,
                    image: {url:image}
                });
                sendback.send(kissMe);
            });
            sendback.stopTyping();
        } else {
            //If User Mention Someone than Kiss the Mention User
            sendback.startTyping();
            const mentionUser = msg.mentions.users.first();
            Asuna.asunaImg('kiss').then(image => {
                sendback.startTyping();
                const kissSomeone = new embed({
                    description: `***${msg.author} kiss ${mentionUser}***`,
                    image: {url: image}
                });
                sendback.send(kissSomeone);
            });
            sendback.stopTyping();
        }

        /*
        Asuna.asunaImg("kiss").then(res => {
            console.log(res);
        });
         */
    }
}
//Libs
const hatsuEmbed = require('../etc/HatsuEmbed');
const {ownerInfo} = require('../stuff/Hatsuku_Owner.json');
const nsfwModel = require('../models/Model_NSFW');

module.exports = {
    name: 'nsfw',
    aliases: [""],
    description: "Verification to Enable NSFW Command",
    async execute(msg, args){
        //Check if the User is the Guild Owner
        if (msg.author.id == msg.guild.ownerID || msg.author.id == ownerInfo.id) {

            //Check if Already a data inside Database
            const nsfwData = await nsfwModel.findOne({
                GuildID: msg.guild.id
            });
            if (!nsfwData) {
                //check the user is only input "auth"
                if (!args[0] || args[0] !== "auth") return msg.reply('**INVALID ARGUMENTS**');

                //Make Verification
                if (args[0] === "auth") {
                    let filter = usr => usr.author.id === msg.author.id
                    const warnEmbed = new hatsuEmbed({
                        title: `NSFW Verification for ${msg.guild.name}`,
                        color: "AQUA",
                        thumbnail: {url: msg.client.user.displayAvatarURL({format: "jpeg", size: 512, dynamic: true})},
                        description: 'Before you choose it would be nice to know what **NSFW** is\n' + 'So what is **NSFW?**\n' +
                            '**NSFW** is a **warning** that indicates a link to a webpage, video, photo, or audio clip contains ***inappropriate content.*** Although the word is usually associated with **pornography**, it’s often used as a warning label for ***violent, foul, offensive, or even politically charged content.***\n' +
                            'It can be concluded that **NSFW** is a ***warning*** about content that contains ***pornographic elements*** or content for ages ***18 and over**\n' +
                            'if you are sure to activate this feature please type **"allow"** or **"abort"** to turn off this feature in your guild FOREVER, (With Out ("") sign).\n' +
                            '**Note:** this command can only be run **once** if you want to reset it, you have to contact ***my master*** to delete your guild from my database, you can still run this command if you haven`t typed **"allow"** or **"abort".**\n' +
                            'You Have **35 Second** to Reply this Message'
                    });
                    msg.channel.send(warnEmbed).then(msg2 => {
                        msg.channel.awaitMessages(filter, {
                            max: 1,
                            time: 35000,
                            errors: ['time']
                        }).then(resp => {
                            const firstResp = resp.first()
                            if (firstResp.author.id !== msg.author.id) return
                            switch (firstResp.content.toLowerCase()) {
                                case "allow":
                                    let allowNSFW = new nsfwModel({
                                        GuildName: msg.guild.name,
                                        allowNSFW: true,
                                        GuildID: msg.guild.id
                                    });
                                    allowNSFW.save();
                                    msg.channel.send(`:white_check_mark: NSFW command is **Allow** to use on ***${msg.guild.name}***`);
                                    break
                                case "abort":
                                    let abortNSFW = new nsfwModel({
                                        GuildName: msg.guild.name,
                                        allowNSFW: false,
                                        GuildID: msg.guild.id
                                    });
                                    abortNSFW.save();
                                    msg.channel.send(`:no_entry_sign: NSFW command is **Not Allow** to use on ***${msg.guild.name}***`);
                                    break
                                default:
                                    msg.author.reply('INVALID ARGUMENT!');
                            }
                        })
                            .catch(() => {
                                msg.channel.send('Time Out!, Please Try to Execute this Command Again!');
                            });
                        msg2.delete({timeout: 40000});
                    });
                }
            } else {
                await msg.reply('You Cannot use this Command Twice!,Please Contact **My Master** to Enable this Command!')
            }
        } else {
            return msg.reply('**ONLY GUILD OWNER & MY MASTER** can use this Command');
        }
    }
}
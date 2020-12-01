//Libs
const clr = require('chalk'); //Text Color
const hatsuEmbed = require('../etc/HatsuEmbed'); //Embed
module.exports = {
    name: 'ban',
    aliases: ['torhummer', 'hardban'],
    description: 'Ban Someone in Your Guild!',
    async execute(msg) {
        //Check if the User is an Guild Owner or
        //the User have Permission ["Manage Member"]
        if (msg.member.guild.ownerID != msg.author.id || !msg.member.hasPermission("MANAGE_CHANNELS")) {
            console.log(clr.magenta(`Command ${this.name} ABORT!,Reason: ${msg.author.username} is Not Have Permission to use it, or ${msg.author.username} is Not the Guild Owner!`));
            await msg.channel.send(`${msg.author} You **Dont** have Permission to Use it!`);
            return
        }
        //Get User Mention
        const mention = msg.mentions.members.first()
        //Split from Mention to Get the Reason
        const reason1 = msg.content.split(" ").slice(2)
        const reason2 = reason1.join(" ")

        //If No Mention is Provide than Send Ban Help Command
        if (!mention) {
            let banHelp = new hatsuEmbed({
                title: ':hammer: Ban Command',
                thumbnail: {url: msg.client.user.displayAvatarURL({size:512, format: "webp", dynamic: true})},
                color: 'AQUA',
                description: 'Ban Someone from your Guild!',
                fields: [{name: 'How to Use?', value: '>ban ***@member*** [Reason]'}]
            });
            return msg.channel.send(banHelp)
        }
        //No Reason? Tell them to Add it!
        if (!reason2) return msg.channel.send(`${msg.author} Please add a Reason!, So iam know why you want to Ban ***"${mention.username}"***`)

        //Time to Give it Tor Hammer
        //Check if the Member is Can be Kick or Not
        /*
        if (msg.member.kickable === false) {
            return msg.channel.send(`I Cant Kick **${mention.username}** Because its Too ***POWERFULLLLLL***`)
        }
         */
        switch (mention.bannable){
            case false:
                await msg.channel.send(`I Cant Ban **${mention.username}** Because its Too ***POWERFULLLLLL***`);
                break
            case true:
                //Ban the Selected Member and Delete there Message overpass 1 Week
                try {
                    await msg.member.ban({days: 7, reason: reason2}).then(banMember => {
                        let banSucces = new hatsuEmbed({
                            title: 'Ban Info',
                            description: `Successfully Ban ${banMember.displayName}`,
                            fields: [{name: 'Username', value: `***${banMember.displayName}***`, inline: true},
                                {name: 'Reason', value: `***${reason2}***`, inline: true}],
                            color: "AQUA",
                            thumbnail: {
                                url: msg.client.user.displayAvatarURL({
                                    size: 512,
                                    format: "webp",
                                    dynamic: true
                                })
                            }
                        });
                        msg.channel.send(banSucces);
                    });
                } catch (e) {
                    return  await msg.channel.send('Something Wrong With Ban Command!, Error:' + `***${e}***`), console.log(clr.red(`Command ${this.name} Error!,Reason:${e}`));
                }
                break
        }
    }
}
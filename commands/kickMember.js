//Libs
const clr = require('chalk'); //Text Color
const hatsuEmbed = require('../etc/HatsuEmbed'); //Embed
module.exports = {
    name: 'kick',
    aliases: ['getout', 'softban'],
    description: 'Kick Someone in Your Guild!',
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

        //If No Mention is Provide than Send Kick Help Command
        if (!mention) {
            let kickHelp = new hatsuEmbed({
                title: ':wave: Kick Command',
                thumbnail: {url: msg.client.user.displayAvatarURL({size:512, format: "webp", dynamic: true})},
                color: 'AQUA',
                description: 'Kick Someone from your Guild!',
                fields: [{name: 'How to Use?', value: '>kick ***@member*** [Reason]'}]
            });
            return msg.channel.send(kickHelp)
        }
        //No Reason? Tell them to Add it!
        if (!reason2) return msg.channel.send(`${msg.author} Please add a Reason!, So iam know why you want to kick ***"${mention.username}"***`)

        //Time to Kick
        //Check if the Member is Can be Kick or Not
        /*
        if (msg.member.kickable === false) {
            return msg.channel.send(`I Cant Kick **${mention.username}** Because its Too ***POWERFULLLLLL***`)
        }
         */
        switch (mention.kickable){
            case false:
                await msg.channel.send(`I Cant Kick **${mention.username}** Because its Too ***POWERFULLLLLL***`);
                break
            case true:
                try {
                    //Check if The Client Have Kick Permission
                    await msg.member.kick(reason2).then(kickMember => {
                        let kickSucces = new hatsuEmbed({
                            title: 'Kick Info',
                            description: `Successfully Kick ${kickMember.displayName}`,
                            fields: [{name: 'Username', value: `***${kickMember.displayName}***`, inline: true},
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
                        msg.channel.send(kickSucces);
                    });
                } catch (e) {
                    return await msg.channel.send('Something Wrong With Kick Command!, Error:' + `***${e}***`), console.log(clr.red(`Command ${this.name} Error!,Reason:${e}`));
                }
                break
        }
    }
}
//Libs
const hatsuEmbed = require('../etc/HatsuEmbed'); //EMBEEDDD

module.exports = {
    name: 'osu',
    aliases: '',
    description: 'Get Information About Osu Player',
    async execute(msg, args) {
        //Some Random Variable
        const sendBack = msg.channel
        //No Username, Tell them to Input the USERNAAMMAME
        if (!args[0]) return sendBack.send(`:warning: ${msg.author} Please Input the **Username** you want to Check!`);
        //Get Help Instead the Username Show the Help Embed
        if (args[0] === 'help') {
            const osuHelp = new hatsuEmbed({
                title: 'OSU Command',
                color: "AQUA",
                description: 'To Use this Command Type `!!osu [username]`',
                thumbnail: {url:msg.client.user.displayAvatarURL({format:"webp", size:512, dynamic: true})}
            });
            return sendBack.send(osuHelp);
        }
        let username = args[0] //Put the Username in this Variable

        await msg.client.zui.getUser({u: username, m: 0,event_days: 7}).then(osuUser => {
            //Make a Embed for the Result and than Send it Back to the user
            sendBack.send(`Loading OSU Profile for ${username}`).then(c => {

                //some Simple Converter
                //Level
                const lF = parseFloat(osuUser[0].level);
                const fixLevel = lF.toFixed();
                //Accuracy
                const aF = parseFloat(osuUser[0].accuracy);
                const fixAccuracy = aF.toFixed(3);
                //PP
                const pF = parseFloat(osuUser[0].pp_raw);
                const fixPP = pF.toFixed();

                const respond = new hatsuEmbed({
                    thumbnail: {url: `http://s.ppy.sh/a/${osuUser[0].user_id}`},
                    color: "AQUA",
                    title: `Profile for ${osuUser[0].username}`,
                    fields: [{name: 'Username', value: `${osuUser[0].username}`, inline: false},
                        {name: 'User ID', value: `${osuUser[0].user_id}`, inline: false},
                        {name: 'First Join', value: `${osuUser[0].join_date}`, inline: false},
                        {name: 'Country', value: `${osuUser[0].country}`, inline:false},
                        {name: 'Level', value: `${fixLevel}`, inline:false},
                        {name: 'Accuracy', value:`${fixAccuracy}`, inline: false},
                        {name: 'PlayCount', value:`${osuUser[0].playcount}`, inline: false},
                        {name: 'PP', value:`${fixPP}`, inline: false}]
                });
                c.edit("",{embed: respond});
            });
        })
    }
}
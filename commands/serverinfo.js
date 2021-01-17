//Libs
const {ownerInfo} = require('../stuff/Hatsuku_Owner.json');
const embed = require('../etc/HatsuEmbed'); 

module.exports = {
    name: 'serverinfo',
    aliases: ["srvinf"],
    description: 'Show Information About Guild',
    async execute(msg) {
        //Check if the User is Guild Owner or My Mastah!~
        if(msg.author.id != msg.guild.ownerID || msg.author.id != ownerInfo.id || !msg.member.hasPermission("MANAGE_GUILD", {checkAdmin: true})) return msg.reply('**Only** Guild Owner, Admin & My Master can Use it!');
        const sendback = msg.channel
        //check if the User is the Bot Owner
            sendback.send('***Getting Guild Information...***')
                .then(c => {
                    //Get guild Data from Cache
                    const guildData = []

                    const Guild = msg.client.guilds.cache.get(msg.guild.id)
                    guildData.push(Guild);
                    const memberData = msg.guild.members.cache.array()
                    const srvInf = new embed({
                        title: `Guild Info for ${guildData[0].name}`,
                        thumbnail: {url: msg.guild.iconURL({size:512,dynamic:true,format:"webp"})},
                        fields:[
                            {name:'Name:', value: guildData[0].name, inline: true},
                            {name:'Guild ID:', value: guildData[0].id, inline: true},
                            {name:'Guild Owner:', value: `<@${guildData[0].ownerID}>`},
                            {name:'Guild Region:', value: guildData[0].region},
                            {name:'Server Boost:', value: guildData[0].premiumTier}
                        ],

                    });
                    c.edit('', {embed:srvInf}).catch(err => console.error(err));
                });
        }
}
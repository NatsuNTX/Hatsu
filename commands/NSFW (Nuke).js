//Libs
const nanaAPI = require('nana-api');
const nhentaiJS = require('nhentai-js');
const embed = require('../etc/HatsuEmbed');
//Nana API
const nana = new nanaAPI();

module.exports = {
    name: 'nuke',
    aliases: [""],
    description: "[NSFW]:Give you Random Nuke Code or Use Your nuke code if You Have it",
    async execute(msg, args) {
        if (!msg.channel.nsfw) {
            return msg.reply("I Can't Let you use this Command in **Public** Chat :/");
        } else {
            const sendback = msg.channel
            const query = msg.content.split(' ').slice(2).join(' ');
            const mode = args[0]

            if(mode === "help" || !mode) {
                const nukeHelp = new embed({
                    title: '[NSFW]:Nuke Code',
                    description: `${this.description}`,
                    thumbnail: {url: 'https://res.cloudinary.com/datasave/image/upload/c_scale,e_auto_contrast,q_61,w_1024/v1610496773/Data/hatsuku/thumbnail/NSFW_Nuke_ygppni.jpg'},
                    fields: [
                        {name:'How To Use:', value: '***nuke ["open", "search", "tag", "random"] ["Nuke Code, tag, name"]***\n Note:Leave it blank if you use **Random**'},
                    ]
                });
                sendback.send(nukeHelp);
            }
            switch (mode) {
                case "open":
                    if (isNaN(query) && query.length > 6 && query.length < 6) return msg.reply('Please Enter a Valid Nuke Code!');
                    //Run Search from Code Function
                    await openTheCode(query, msg);
                    break;
                case "search":
                break
            }
        }
    }
}

/* Function for Nuke Command */
async function openTheCode(codequery, message) {
    const codeResult = await nhentaiJS.getDoujin(codequery);

    //Loop To Get Character
    let char = ``
    for (let a = 0; a < codeResult.details.characters.length; a++ ) {
        char += `\n ***${codeResult.details.characters[a]}***\n`
    }
    //Base Embed
    const NukeCodeEmbed = new embed()
        .setTitle(`Nuke for ***${codequery}***`)
        .setThumbnail(`${codeResult.thumbnails[0]}`)
        .setDescription(`***${message.author} This is What i found with That code you Give me!***`)
        .addField('Title:', `**${codeResult.title}**\n ${codeResult.nativeTitle}`)
        .addField('Pages:', `**${codeResult.details.pages}**`)
        .addField('Character:', `***${char}***`)
        .addField('Categories:', `***${codeResult.details.categories}***`)
        .addField('Read?', `***[Click Here](${codeResult.link}1/)*** if You Want to Read it`);

    //Send the Result
    message.channel.send(NukeCodeEmbed);
}
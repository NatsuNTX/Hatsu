//Libs
const {MessageEmbed} = require('discord.js');
const {name,version} = require('../package.json'); //Get Version and Name
const {ownerInfo} = require('../stuff/Hatsuku_Owner.json');

class HatsuEmbed extends MessageEmbed {
    constructor(opts) {
        if (opts !== undefined) {
            opts.color = opts.color === undefined ? '#7f78cf' : opts.color
            opts.footer = opts.footer === undefined ? {text:`${name} V${version} | Self Hosted By:${ownerInfo.name}`} : opts.footer
            super(opts)
        } else {
            opts = {
                color: '#7f78cf',
                footer: {text:`${name} V${version} | Self Hosted By:${ownerInfo.name}`}
            }
            super(opts)
        }
    }
}
module.exports = HatsuEmbed
//TODO:Try to fix Embed Error in Glitch
//Libs
const hatsuEmbed = require('../etc/HatsuEmbed');
const clr = require('chalk'); //Text Color
const fs = require('fs'); //File System
const {FX} = require('../src/FXConfig.json');

//Check for URL
function isURL(url) {
    try {
        new URL(url);
        console.log(clr.yellow('Url Found!'));
        return true
    } catch (error) {
        return false
    }
}
//The Rest of the Code
//Code is Copy From Shiku with Some Edit
//Because iam to Lazy to Write it :)
module.exports = {
    name: 'play',
    aliases: ["ply", "p"],
    description: 'Play Some Music for You',
    async execute(msg, args) {
        //I Dont see the user on the voice channel
        if (!msg.member.voice.channel) return msg.channel.send(`${msg.author} Please Join the Voice Channel First Before Using this Commands!`);
        //Make argument to be 1 array
        //for example from ["tiny", "light"] to ["tiny light"]
        let search = args.join(" ");
        //No Name or Link
        if (!search) return msg.channel.send(`${msg.author} You Need to input the name/Link first before you using!`);
        //if user input a word 'help' after commands exp: >play help, show command help instead searching
        switch (search) {
            case "help":
                let playHelp = new hatsuEmbed({
                    title: ':musical_note: Play Command',
                    color: 'AQUA',
                    description: this.description,
                    fields: [{name: 'How to Use?', value: '>play [songname/Link]'}]
                });
                return await msg.channel.send(playHelp);
        }
        //Check if Someone Still Using a Radio
        //We Simply Check if file "radio_ID_GUILDID" is Exists or Not
        //if Exists than someone is still using radio module
        const radioStatus = fs.existsSync(`./hatsutemp/radio_ID_${msg.guild.id}.inf`);
            if (radioStatus === true){
                return msg.channel.send(`:warning: ${msg.author} Someone is Still Using **RADIO** command,Please Stop it First and than Try Again!`);
            } else {
                //check if is bot already connect to voice channel
                    //Get the Node first
                    const node = msg.client.nodeMusic.getNode()
                    //if user input a Link
                    if (isURL(search)) {
                        //Get the Link than Resolve it
                        const result = await node.rest.resolve(search);
                        //if Nothing found in that Link, say I cant found anything
                        if (!result) return msg.channel.send(`${msg.author} I Cant Find any song in that link!`);

                        //New Method
                        const vc = msg.member.voice.channel
                        let playerCenter = msg.client.playCenter.get(msg.guild.id);
                        if(vc) {
                            if(!msg.client.voice.connections.some(conn => conn.channel.id === vc.id)) {
                                if(!playerCenter) {
                                    const voiceConnection = await vc.join();
                                    const dispacther = voiceConnection.play(`./src/fx/${FX.musicStart}`);
                                    dispacther.once('finish', () => {
                                        vc.leave();
                                        return playAudioWithLink(msg, node, result);
                                    });
                                } else {
                                    return playAudioWithLink(msg, node, result);
                                }
                            }
                        }
                    //Now if User just input the name
                    } else {
                        const result = await node.rest.resolve(search, 'youtube');
                        //No Result, nothing to play
                        if (!result.tracks.length) return msg.channel.send(`:question: ${msg.author} I Cant find any song you are looking for!`);

                        //add the Result to Track Variable
                        const track = result.tracks.shift();

                        //New Method
                        const vc = msg.member.voice.channel
                        let playerCenter = msg.client.playCenter.get(msg.guild.id);
                        if(vc) {
                            if(!msg.client.voice.connections.some(conn => conn.channel.id === vc.id)) {
                                if(!playerCenter) {
                                    const voiceConnection = await vc.join();
                                    const dispacther = voiceConnection.play(`./src/fx/${FX.musicStart}`)
                                    dispacther.once('finish', () => {
                                        vc.leave();
                                        return playAudio(msg, node, track);
                                    });
                                } else {
                                    return playAudio(msg, node, track);
                                }
                            }
                        }
                    }
                }
            }
}
//If user Type the Name of the Track with out using Link
async function playAudio (message, node, track) {
    this.message = message

    //initialise Play Handler in playCenter
    const res = await this.message.client.playCenter.handle(node, track, this.message);
    //tell the requested track already added to the queue
    await this.message.channel.send(`:white_check_mark: Added **${track.info.title}** to the queue`);
    //Now Play it!
    if (res) return res.play();
}
async function playAudioWithLink(message, node, trackdata) {
    this.message = message

    //get Track, Playlistname, and Type
    const {type, tracks, playlistName} = trackdata

    //Put Track to Queue
    const track = tracks.shift();

    //Playlist
    const isPlaylist = type === "PLAYLIST";

    //Main Music Player
    const res = await this.message.client.playCenter.handle(node, track, this.message);

    //if its a Playlist Get all Track Data on that Playlist and Put it on the queue
    if (isPlaylist) {
        for (const trackData of tracks) await this.message.client.playCenter.handle(node, trackData, this.message);
    }
    //Send info to Channel
    await this.message.channel.send(isPlaylist ? `:white_check_mark: Added Playlist **${playlistName}** to the Queue!` : `:white_check_mark: Added **${track.info.title}** to the queue!`)

    //Now Play it
    if (res) return res.play();
}
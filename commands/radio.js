//Some Stuff
const {radioList} = require('../stuff/radio_list.json'); //Get Radio List
const hatsuEmbed = require('../etc/HatsuEmbed'); //Embeddd
const del = require('del'); //Delete File Module (Cuz i Suck use FS)
const fs = require('fs');

module.exports = {
    name: 'radio',
    aliases: ['radio', 'rdo'],
    description: 'Play Music from Internet Radio',
    async execute(msg, args) {
        //Put Voice Channel Id to empty Array
        let theVoiceID = []

        //No One in the Voice Channel
        if (!msg.member.voice.channel) return msg.channel.send(`${msg.author} Please Join the Voice Channel First Before Using This Commands!`);
        //if No Optional Argument than Show Radio List
        const Station = args.join(" ");
        if (!Station || Station > 6 || Station == 0) {
            let radioHelp = new hatsuEmbed({
                title: ':radio: Radio List',
                description: 'Please Type ***1 - 6*** to Select Radio Station from the List! (Type "stop" to Stop!)',
                color: 'AQUA',
                thumbnail: {url: msg.client.user.displayAvatarURL({size: 512, format: "webp", dynamic: true})},
                fields: [{
                    name: ':satellite: Station List',
                    value: `1.${radioList.list1.name}\n` + `2.${radioList.list2.name}\n` + `3.${radioList.list3.name}\n` + `4.${radioList.list4.name}\n` + `5.${radioList.list5.name}\n` + `6.${radioList.list6.name}\n`
                }]
            });
            await msg.channel.send(radioHelp)
            return;
        }

        //Check if Someone is Using Music Command
        let playerCenter = msg.client.playCenter.get(msg.guild.id);
        if (playerCenter) return msg.channel.send(`:warning: ${msg.author} Sorry But Someone is Still Using ***MUSIC*** Command!,Please Stop it First and Try Again`)
        //Create a Voice Connection
        await msg.member.voice.channel.join().then(voiceConnection => {
                msg.client.voice.connections.filter(conn => {
                    theVoiceID.push(conn.channel.id)
                });
                if (!fs.existsSync(`./hatsutemp/radio_ID_${msg.guild.id}.inf`)) {
                    const file = fs.createWriteStream(`./hatsutemp/radio_ID_${msg.guild.id}.inf`, {encoding: "utf16le"});
                    file.on('error', (err => {
                        console.error(`Something Wrong:${err}`)
                    }));
                    file.on('finish', () => {
                        console.log('Finish Writing Radio Data to "/hatsutemp/"')
                    })
                    theVoiceID.forEach(function (a) {
                        file.write(a);
                        file.close();
                    });
                }

            //console.log(Station)
            //Select Station
           switch (Station) {
                //Station 1
                case "1":
                    const dispatch = voiceConnection.play(radioList.list1.audioLink, {volume: 1, bitrate: "auto", fec: true});
                    dispatch.on('finish', () => {
                        voiceConnection.play(radioList.list1.audioLink, {volume: 1, bitrate: "auto", fec: true});
                    });
                    msg.channel.send(`Now Playing Radio: ***${radioList.list1.name}*** **Requested by: ${msg.author}**`);
                    break
                //Station 2
                case "2":
                    const dispatch1 = voiceConnection.play(radioList.list2.audioLink, {volume: 1, bitrate: "auto", fec: true});
                    dispatch1.on('finish', () => {
                        voiceConnection.play(radioList.list2.audioLink, {volume: 1, bitrate: "auto", fec: true});
                    });
                    msg.channel.send(`Now Playing Radio: ***${radioList.list2.name}*** **Requested by: ${msg.author}**`);
                    break
                //Station 3
                case "3":
                    const dispatch2 = voiceConnection.play(radioList.list3.audioLink, {volume: 1, bitrate: "auto", fec: true});
                    dispatch2.on('finish', () => {
                        voiceConnection.play(radioList.list3.audioLink, {volume: 1, bitrate: "auto", fec: true});
                    });
                    msg.channel.send(`Now Playing Radio: ***${radioList.list3.name}*** **Requested by: ${msg.author}**`);
                    break
               //Station 4
               case "4":
                   const dispatch3 = voiceConnection.play(radioList.list4.audioLink, {volume: 1, bitrate: "auto", fec: true});
                   dispatch3.on('finish', () => {
                       voiceConnection.play(radioList.list4.audioLink, {volume: 1, bitrate: "auto", fec: true});
                   });
                   msg.channel.send(`Now Playing Radio: ***${radioList.list4.name}*** **Requested by: ${msg.author}**`);
                   break
               //Station 5
               case "5":
                   const dispatch4 = voiceConnection.play(radioList.list5.audioLink, {volume: 1, bitrate: "auto", fec: true});
                   dispatch4.on('finish', () => {
                       voiceConnection.play(radioList.list5.audioLink, {volume: 1, bitrate: "auto", fec: true});
                   });
                   msg.channel.send(`Now Playing Radio: ***${radioList.list5.name}*** **Requested by: ${msg.author}**`);
                   break
               //Station 6
               case "6":
                   const dispatch5 = voiceConnection.play(radioList.list6.audioLink, {volume: 1, bitrate: "auto", fec: true});
                   dispatch5.on('finish', () => {
                       voiceConnection.play(radioList.list6.audioLink, {volume: 1, bitrate: "auto", fec: true});
                   });
                   msg.channel.send(`Now Playing Radio: ***${radioList.list6.name}*** **Requested by: ${msg.author}**`);
                   break
                //Stop the Radio!
                case "stop":
                    try {
                        del(`./hatsutemp/radio_ID_${msg.guild.id}.inf`, {force: true})
                        msg.member.voice.channel.leave();
                        msg.channel.send('Stopping ***Radio***');
                    } catch (e) {
                        console.error(e);
                    }
                    break
            }
        })

        /*   <Not Use just for Reference>
        await msg.member.voice.channel.join().then(voiceConnection => {
            if (args[0] == 1) {
                const dispatch = voiceConnection.play(radioList.list1.audioLink, {volume: 1, bitrate: "auto"})
                dispatch.on('finish',() => {
                    voiceConnection.play(radioList.list1.audioLink, {volume: 1, bitrate: "auto"})
                });
                msg.channel.send(`Now Playing Radio: ***${radioList.list1.name}*** **Requested by: ${msg.author}**`);
                return
            }
            if (args[0] == 2) {
                const dispatch = voiceConnection.play(radioList.list2.audioLink, {volume: 1, bitrate: "auto"})
                dispatch.on('finish',() => {
                    voiceConnection.play(radioList.list2.audioLink, {volume: 1, bitrate: "auto"})
                });
                msg.channel.send(`Now Playing Radio: ***${radioList.list2.name}*** **Requested by: ${msg.author}**`);
                return
            }
            if (args[0] == 3) {
                const dispatch = voiceConnection.play(radioList.list3.audioLink, {volume: 1, bitrate: "auto"});
                dispatch.on('finish',() => {
                    voiceConnection.play(radioList.list3.audioLink, {volume: 1, bitrate: "auto"})
                });
                msg.channel.send(`Now Playing Radio: ***${radioList.list3.name}*** **Requested by: ${msg.author}**`);
                return

            }
            if (args[0] === "stop") {
                msg.member.voice.channel.leave();
                msg.channel.send('Stopping Radio');
            }
        })
         */
    }
}

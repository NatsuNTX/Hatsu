//Libs
const clr = require('chalk');
const {Shoukaku} = require('shoukaku'); //Lavalink Wrapper
require('dotenv').config()

const hatsuLog = require('../etc/Hatsu Logger');

//Logger
const hatsuNodeDebug = hatsuLog.getLogger("HatsuMusicDebug");
const hatsuNodeError = hatsuLog.getLogger("HatsuMusicError");

//Some Lavalink Option
const nodeOption = { moveOnDisconnect: false, resumable: false, resumableTimeout: 30, reconnectTries: 15, restTimeout: 450000 };
const nodeConfig = [{name: 'Lavalink', host: process.env.LAVA_HOST, port: process.env.LAVA_PORT, auth: process.env.LAVA_PASSWORD}]

class musicNode extends Shoukaku {
    constructor(props) {
        super(props,nodeConfig,nodeOption);

        //Node Status
        this.on('ready', name => hatsuNodeDebug.debug('MusicNode: ', `Connected to ${name}`));
        this.on('closed', (name, reason) => hatsuNodeError.error('MusicNode: ', `Connection Close From ${name}!,Reason:${reason}`));
        this.on('trackException', (reason) => {
            hatsuNodeError.error('MusicNode: ', `Something Wrong While Hatsuku is Playing a Track!,Error:${reason}`);
        });
        this.on('error', (name, error) => {
            hatsuNodeError.error('MusicNode: ', `Something Wrong in node ${name}!,Error:${error}`);
        });
    }
}
module.exports = musicNode
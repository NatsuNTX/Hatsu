//Libs
const fs = require('fs'); //File System
const clr = require('chalk'); //Text Color
const hatsuLog = require('./Hatsu Logger');

//Logger
const hatsuDebug = hatsuLog.getLogger("HatsuDebug");
const hatsuError = hatsuLog.getLogger("HatsuError");

class eventHandler {
    constructor(client) {
        this.client = client;
        //Load the Method
        this.okEvent();
    }
    okEvent() {
        fs.readdir('./events', (err, data) => {
            if (err) return hatsuError.error(`Failed to Run EventHandler!, Error:${err}`);
            data.forEach(file => {
                if (!file.endsWith('.js')) return //Nothing
                const events = require(`../events/${file}`);
                //Get File Name
                let eventName = file.split('.')[0];
                //Run the Event
                this.client.on(eventName, events.bind(null, this.client));
                hatsuDebug.debug(`Loading Event:${eventName}`);
            });
        });
    }
}

module.exports = eventHandler
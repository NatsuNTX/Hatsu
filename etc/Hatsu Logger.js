//Libs
//const clr = require('chalk');
const logger = require('log4js');

const hatsuLog = logger.configure({
    appenders:{
        HatsuError: {
            type: "file",
            filename: "log/hatsuku.log"
        },
        HatsuConsoleError: {
            type: "console",
            layout: {type: "coloured"}
        },
        HatsuInfo: {
            type: "file",
            filename: "log/hatsuku.log"
        },
        HatsuConsoleInfo: {
            type: "console",
            layout: {type: "coloured"}
        },
        HatsuDebug: {
            type: "file",
            filename: "log/hatsuku.log"
        },
        HatsuConsoleDebug: {
            type: "console",
            layout: {type: "coloured"}
        },
        HatsuMusicDebug: {
            type: "file",
            filename: "log/hatsuMusicNode.log",
        },
        HatsuMusicDebugConsole: {
            type: "console",
            layout: {type: "coloured"}
        },
        HatsuMusicError: {
          type: "file",
          filename: "log/hatsuMusicNode.log",
        },
        HatsuMusicErrorConsole: {
            type: "console",
            layout: {type: "coloured"}
        },
        HatsuMusicWarn: {
            type: "file",
            filename: "log/hatsuMusicNode.log",
        },
        HatsuMusicWarnConsole: {
            type: "console",
            layout: {type: "coloured"}
        },
        HatsuWarn: {
            type: "file",
            filename:  "log/hatsuku.log",
        },
        HatsuWarnConsole: {
            type: "console",
            layout: {type: "coloured"}
        }

    },
    categories: {
        default: {
            appenders: ["HatsuInfo", "HatsuConsoleInfo"],
            level: "info"
        },
        HatsuInfo: {
            appenders: ["HatsuInfo", "HatsuConsoleInfo"],
            level: "info"
        },
        HatsuError: {
            appenders: ["HatsuError", "HatsuConsoleError"],
            level: "error"
        },
        HatsuDebug: {
            appenders: ["HatsuDebug", "HatsuConsoleDebug"],
            level: "debug"
        },
        HatsuMusicDebug: {
            appenders: ["HatsuMusicDebug", "HatsuMusicDebugConsole"],
            level: "debug"
        },
        HatsuMusicError: {
            appenders: ["HatsuMusicError", "HatsuMusicErrorConsole"],
            level: "error"
        },
        HatsuMusicWarn: {
            appenders: ["HatsuMusicWarn", "HatsuMusicWarnConsole"],
            level: "warn"
        },
        HatsuWarn: {
            appenders: ["HatsuWarn", "HatsuWarnConsole"],
            level: "warn"
        }
    }


    /*
    appenders: { HatsuError: { type: ["file", "console"], filename: "Hatsuku.log" } },
    categories: { default: { appenders: ["HatsuError"], level: "error" } }

     */
});

module.exports = hatsuLog
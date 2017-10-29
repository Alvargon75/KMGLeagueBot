const Discord = require('discord.js');
const yaml = require('yaml-js');
const bot = new Discord.Client();
const config = require('./config.json');
const locale = require('./locale.json');
const private = require('./private.json'); // This file contains the token, you have to make one if you are using the source code yourself
const prefix = config.prefix + " ";

bot.on('ready', () => {
    console.log("Running...");
});

// Message Event Handler

bot.on('message', (message) => {

    // Efficiency, stop analyzing messages if they don't start with prefix
    if(message.author.bot){return};
    if(!message.content.startsWith(prefix)){return};

    // Set a command variable for handling things more easily
    let command = message.content.split(" ")[1];

    // Set arguments
    let args = message.content.split(" ").slice(2);

    if(command === 'test'){
        message.channel.send(locale.commands.test);
    }else if(command === 'say'){
        message.channel.send(args.join(" "));
    }else if(command === 'add'){

        let total = 0;
        for (let i = 0; i < args.length; i++) {
            let nm = parseInt(args[i])
            total += nm;
        }

        message.channel.send(total);
    }else if(command === 'help'){
        message.channel.send(locale.help);
    };
});

// Voice Update Event Handler

bot.on('voiceStateUpdate', (oldMember, newMember) => {

    if(oldMember.voiceChannel === config.generalCh && config.noticeVoiceChannelActivity.join && newMember.user.username !== "kmgbot"){

        // Prints the text notification
        newMember.guild.channels.get("241853467814002688").send(`${newMember.user.username} ha entrado al chat de voz.`);

        // Checks and executes if the voice notification is on
        if(config.noticeVoiceChannelActivity.audioWarning === true){

            let vc = newMember.voiceChannel;


            vc.join().then(connection => {

                // TODO: remove unnecesaty console.log and add time for the auds intstead of null
                let fileName = function () {

                    let un = newMember.user.username.toLowerCase();

                    console.log(un);

                    switch (un) {
                        case "alvargon75":
                            return ["/Alvargon75.flac", 3999];
                            break;
                        case "xabiru10":
                            return ["/Xabiru10.flac", 3999];
                            break;
                        case "aksu200":
                            return ["/Aksu200.flac", 2999];
                            break;
                        case "alexkmg":
                            return ["/alexkmg.flac", 3999];
                            break;
                        case "isma01l":
                            return ["/isma01l.flac", 3999];
                            break;
                        case "davidglmp":
                            return ["/davidglmp.flac", 4999];
                            break;
                        case "petrobichyt":
                            return ["/petrobichyt.flac", 3999];
                            break;
                        default:
                            return ["/def.flac", 1999];
                    }
                }();

                let dispatcher = connection.playFile(config.noticeVoiceChannelActivity.route + fileName[0]);
                setTimeout(() => {vc.leave()}, fileName[1] + 2999);

            }).catch(err => {console.log(err); vc.leave();});

        };
    }else if(newMember.voiceChannel === config.generalCh && config.noticeVoiceChannelActivity.leave && newMember.user.username !== "kmgbot"){

        newMember.guild.channels.get("241853467814002688").send(`${newMember.user.username} ha salido del chat de voz.`);

    }
});

bot.login(private.discordToken);

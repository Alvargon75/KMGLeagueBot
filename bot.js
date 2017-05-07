const Discord = require('discord.js');
const bot = new Discord.Client();
const config = require('./config.json');
const private = require('./private.json'); // This file contains the token, you have to make one if you are using the source code yourself
const prefix = config.prefix + " ";

bot.on('ready', () => {
    console.log("Running...")
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
        message.channel.send('I am running correctly');
    }else if(command === 'say'){
        message.channel.send(args.join(" "));
    }else if(command === 'add'){

        let total = 0;
        for (let i = 0; i < args.length; i++) {
            let nm = parseInt(args[i])
            total += nm;
        }

        message.channel.send(total);
    }
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

                let un = function () { // Clunky ass funtion but it makes is work
                    let result = newMember.user.username.toLowerCase();
                    return result;
                }();
                console.log(un);

                // TODO: remove unnecesaty console.log and add time for the auds intstead of nulls
                let fileName = function () {
                    switch (un) {
                        case "alvargon75":
                            return ["/Alvargon75.mp3", null];
                            break;
                        case "xabiru10":
                            return ["/Xabiru10.mp3", null];
                            break;
                        case "aksu200":
                            return ["/Aksu200.mp3", null];
                            break;
                        case "alexkmg19":
                            return ["/alexkmg19.mp3", null];
                            break;
                        default:

                    }
                }();

                let dispatcher = connection.playFile(config.noticeVoiceChannelActivity.route + fileName[0]);
                setTimeout(() => {vc.leave()}, 10000)

            }).catch(err => {console.log(err); vc.leave();});

        };
    }else if(newMember.voiceChannel === config.generalCh && config.noticeVoiceChannelActivity.leave && newMember.user.username !== "kmgbot"){

        newMember.guild.channels.get("241853467814002688").send(`${newMember.user.username} ha salido del chat de voz.`);


    }
});

bot.login(private.discordToken);

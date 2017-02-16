const Discord = require('discord.js');
const bot = new Discord.Client();
const config = require('./config.json');
const private = require('./private.json'); // This file contains the token, you have to make one if you are using the source code yourself
const pref = config.prefix + " ";

bot.on('ready', () => {
    console.log("Running...")
});

bot.on('message', (message) => {

    // No answer rules
    if(message.author.bot){return};
    if(!message.content.startsWith(pref)){return};

    // Set a command variable for commodity
    let command = message.content.split(" ")[1];

    // Set the arguments for the bot
    let args = message.content.split(" ").slice(2);

    if(command === 'ping'){
        message.channel.sendMessage('pong');
    }else if(command === 'say'){
        message.channel.sendMessage(args.join(" "));
    }else if(command === 'add'){

        let total = 0;
        for (let i = 0; i < args.length; i++) {
            let nm = parseInt(args[i])
            total += nm;
        }

        message.channel.sendMessage(total);
    }
});

bot.login(private.discordToken);

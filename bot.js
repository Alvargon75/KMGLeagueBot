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

// Updates Event Handler

bot.on('presenceUpdate', (oldMember, newMember) => {
    
})

bot.login(private.discordToken);

const Discord = require('discord.js');
const bot = new Discord.Client();
const pref = '!kmg ';

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

bot.login('MjgwNzE5ODM0Nzc2NDY5NTE2.C4NgQg.M2qWarNgFKx8rHwHYf6xa63uIo8');

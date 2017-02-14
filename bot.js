const Discord = require('discord.js');
const bot = new Discord.Client();

bot.on('message', (message) => {
    if(message.content == "ping"){
        message.channel.sendMessage('pong');
    }
});

bot.login('MjgwNzE5ODM0Nzc2NDY5NTE2.C4NgQg.M2qWarNgFKx8rHwHYf6xa63uIo8');

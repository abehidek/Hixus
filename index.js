const Discord = require('discord.js');
const client = new Discord.Client();
require('dotenv').config()
// process.env.TOKEN

client.login(process.env.TOKEN);

const prefix = 'h!';


const fs = require('fs');

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}


client.once('ready', () => {
    console.log('Hixus is online')
});

client.on('message', message => {

    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    switch (command){

        case "ping":
            client.commands.get('ping').execute(message, args);
            break;

        case "pomodoro":
            client.commands.get('pomodoro').execute(message, client, args);
            break;

        case "pomobreak":
            client.commands.get('pomodoro').execute(message, args);
            break;
    }
});
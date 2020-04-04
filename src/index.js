const Discord = require('discord.js');
const commandHandler = require('./commands');

const client = new Discord.Client();

client.once('ready', () => {
  console.log("Alright ramblers, let's get rambling");
});

client.on('message', commandHandler);

client.login(process.env.BOT_TOKEN);

// We will need to 'require' some packages to use for this file
const dotenv = require('dotenv'); // This allows us to use the constants in our .env file
dotenv.config(); // Read the constants in our .env file

// Require the needed discord.js classes
const Discord = require('discord.js');

// Create a new Discord client
const client = new Discord.Client();

// When the client is ready, run this code once
client.once('ready', () => {
    // Print out 'Ready!' in the console (terminal)
    console.log('Ready!');
});

// Login to Discord with your bot's token
client.login(process.env.DISCORD_TOKEN);

// We're going to set our command prefix as *. You can use whatever you'd like
const prefix = "*"

// Whenever the client sees a new message in the chat, run the following code
client.on('message', message => {
    // If the message doesn't start with the prefix or the message is coming from another bot, we're not going to do anything
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    // Otherwise, we'll respond with 'Hello World!'
    if (message.content === 'hello')
        message.channel.send('Hello World!');
});

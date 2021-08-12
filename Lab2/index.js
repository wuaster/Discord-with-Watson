// We will need to 'require' some packages to use for this file
const dotenv = require('dotenv'); // This allows us to use the constants in our .env file
dotenv.config(); // Read the constants in our .env file

// Require the needed discord.js classes
const Discord = require('discord.js');

// Create a new Discord client
const client = new Discord.Client();

const AssistantV2 = require('ibm-watson/assistant/v2'); // Add Watson Assistant
const { IamAuthenticator } = require('ibm-watson/auth'); // Add Watson Authentication

// Add our assistant from the IBM Watson Assistant service
const assistant = new AssistantV2({
    version: '2021-06-14',
    authenticator: new IamAuthenticator({
      apikey: process.env.ASSISTANT_KEY,
    }),
    serviceUrl: process.env.ASSISTANT_URL,
});

async function sendMessage(message) {
    try {
        // Start a new session with our asssistant
        const sessionId = (await assistant.createSession({ assistantId: process.env.ASSISTANT_ID  })).result.session_id;
        // Send the user's question to our assistant
        assistant.message(
            {
                input: { text: message.content.substring(1) },
                assistantId: process.env.ASSISTANT_ID,
                sessionId: sessionId
            })
            .then(response => {
                //  Convert the response into a readable message for our users
                let text =  JSON.stringify(response.result.output.generic[0].text, null, 2); // pass the value to the global variable
                // Tell the discord bot to reply with the assistant's reply
                message.reply(text);
                return JSON.stringify(response.result.output.generic[0].text, null, 2);
            })
            .catch(err => {
                // In case of an error, tell us what it is in the terminal
                console.log(err);
                return error.stringify;
            });
    } catch (error) {
        // In case of an error, tell us what it is in the terminal
        console.error(error);
    }  
}

client.once('ready', () => {
    console.log('Ready!');
});

client.login(process.env.DISCORD_TOKEN);

const prefix = "*"

client.on('message', message => {
    // If the message doesn't start with the prefix or the message is coming from another bot, we're not going to do anything
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    // Otherwise, we'll send that message to our assistant
    sendMessage(message);
});

const { Client, GatewayIntentBits } = require('discord.js'); // import from Discord client
const client = new Client({ intents: 
  [GatewayIntentBits.Guilds,
    GatewayIntentBits.MessageContent
  ] });
const dotenv  = require('dotenv');
dotenv.config();


client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});


// command in Discord
client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'ping') {
    await interaction.reply('Pong!');
  }
});

client.login(process.env.TOKEN_);


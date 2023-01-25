const { Client, GatewayIntentBits } = require('discord.js'); // import from Discord client

// create a new client bot
const client = new Client({ intents: 
  [GatewayIntentBits.Guilds,
    GatewayIntentBits.MessageContent,
  ] });


const {Configuration, OpenAIApi} = require('openai');
const config_gbt = new Configuration({
  apiKey: process.env.GBT_KEY,
  organization : process.env.GBT_ORG
});
const openai = new OpenAIApi(config_gbt);

// access to .env file
const dotenv  = require('dotenv');
dotenv.config();

// when the bot is ready, print a message
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

//Command in Discord
client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'ping') {
    await interaction.reply('Pong!');
  };
//   // get message your in put
  if (interaction.commandName === 'chat_gbt') {
    // const message = interaction.commandText;
    // await interaction.reply(message);
    await interaction.reply('Please type the message you would like me to send to OpenAI:');
  };
    // await interaction.reply(`TEXT \n ${interaction.options.getString('Message-to-OpenAI')}`);



    // const userMessage = await interaction.nextMessage();
    // const response = await openai.Completion.create({
    //   prompt: userMessage.content,
    //   engine: "text-davinci-002"
    // });

    // send the response from the API to the Discord channel
    // await interaction.reply(response.choices[0].text);
  // };
});


// client.on('messageCreate', async message => {
//   if (message.content === 'ping') {
//     await message.reply('Pong!');
//   };
// })

// login to Discord with your app's token
client.login(process.env.TOKEN_);


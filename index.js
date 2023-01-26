const { Client, GatewayIntentBits, escapeMarkdown } = require("discord.js"); // import from Discord client

// create a new client bot
const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent],
});

const { Configuration, OpenAIApi } = require("openai");

const config_gbt = new Configuration({
  apiKey: process.env.GBT_KEY,
  organization: process.env.GBT_ORG,
});
const openai = new OpenAIApi(config_gbt);

// access to .env file
const dotenv = require("dotenv");
dotenv.config();

// when the bot is ready, print a message
client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

//Command in Discord
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "ping") {
    await interaction.reply("Pong!");
  }
  //   // get message your in put
  if (interaction.commandName === "chat_gbt") {
    // await interaction.reply(interaction.options.getString("message"));
    //await interaction.reply('Please type the message you would like me to send to OpenAI:');


    const message = interaction.options.getString("message");
    console.log(message);

    const response = await openai.Completion.create({
      prompt: message,
      engine: "text-davinci-003",
    });

  //   // send the response from the API to the Discord channel
  //   await interaction.reply(response.choices[0].text);
  await interaction.reply("!");
  }
});

// login to Discord with your app's token
client.login(process.env.TOKEN_);

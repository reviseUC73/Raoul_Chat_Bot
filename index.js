const { Client, GatewayIntentBits } = require("discord.js"); // import from Discord client

// access to .env file
const dotenv = require("dotenv");
dotenv.config();

// create a new client bot
const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent],
});

const { Configuration, OpenAIApi } = require("openai");

const config_gbt = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
  organization: process.env.GBT_ORG,
});

const openai = new OpenAIApi(config_gbt);

// when the bot is ready, print a message
client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

//Command in Discord
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "ping") {
    try {
      const completion = await openai.createCompletion({
        model: "text-davinci-002",
        prompt: "Hello world",
      });
      console.log(completion.data.choices[0].text);
    } catch (error) {
      if (error.response) {
        console.log(error.response.status);
        console.log(error.response.data);
      } else {
        console.log(error.message);
      }
    }
    await interaction.reply("Pong!");
  }
  //   // get message your in put
  if (interaction.commandName === "chat_gbt") {
    // await interaction.reply(interaction.options.getString("message"));
    //await interaction.reply('Please type the message you would like me to send to OpenAI:');

    // console.log(typeof text_);
    // console.log( text_);
    try {
      const text_ = interaction.options.getString("message");

      const completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: text_,
      });
      const response = completion.data.choices[0].text;
      console.log(response);
      await interaction.reply(response);
      
    } catch (error) {
      if (error.response) {
        console.log(error.response.status);
        console.log(error.response.data);
      } else {
        console.log(error.message);
      }
    }

    // try {
    //   const completion = await openai.Completion.create({
    //     prompt: text_,
    //     engine: "text-davinci-003",
    //     maxTokens: 100,
    //     temperature: 0.9,
    //   });
    //   const response = completion.data.choices[0].text;
    //   //   // send the response from the API to the Discord channel
    //   // await interaction.reply(response.data);`
    //   // console.log(response);
    //   await interaction.reply(response);
    //   // console.log(response.data.choices[0].text);
    //   // await interaction.reply(response.data.choices[0].text);
      
    // } catch (error) {
    //   console.error(error);
      
    // }
  
  }
});

// login to Discord with your app's token
client.login(process.env.TOKEN_);

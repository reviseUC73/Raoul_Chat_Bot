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
    // try {
    //   const completion = await openai.createCompletion({
    //     model: "text-davinci-002",
    //     prompt: "Hello world",
    //   });
    //   console.log(completion.data.choices[0].text);
    // } catch (error) {
    //   if (error.response) {
    //     console.log(error.response.status);
    //     console.log(error.response.data);
    //   } else {
    //     console.log(error.message);
    //   }
    // }
    await interaction.reply(`A domain model is a visual representation of a system’s objects, their attributes and relationships, which helps to identify the objects, how they are related to each other, and what services they provide. It is used to design the architecture of a software system, and is usually created in the form of a diagram.  A domain model is created to help the designer think through a complex application and identify all the different objects that must be taken into account when developing the app.
    Unknown interaction`);
  }
  //   // get message your in put
  if (interaction.commandName === "chat_gbt") {
    // await interaction.reply(interaction.options.getString("message"));
    //await interaction.reply('Please type the message you would like me to send to OpenAI:');

    // console.log(typeof text_);
    // console.log( text_);
    // try {
    const text_ = interaction.options.getString("message");

    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: text_,
      max_tokens: 2048,
      temperature: 0.5,
    });
    try {
      const response = completion.data.choices[0].text;
      await interaction.reply(response);
    } catch (error) {
      console.error(error);
      await interaction.reply(
        "Sorry, there was an error processing your request."
      );
    }

    // } catch (error) {
    //   if (error.response) {
    //     console.log(error.response.status);
    //     console.log(error.response.data);
    //   } else {
    //     console.log(error.message);
    //   }
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
});

// login to Discord with your app's token
client.login(process.env.TOKEN_);

const { REST, Routes} = require('discord.js');
const dotenv  = require('dotenv');
dotenv.config();

// name command and description
const commands = [
  {
    name: 'ping',
    description: 'Replies with Pong!',
    
  },
  {
    name: 'chat_gbt',
    description: 'Use this command to use the Chat GBT helper',
    options : [
      {
        name: 'message',
        type:3,
        require:true,
        description: 'Type the message you would like to send to OpenAI',
        max_length: 6000
      }
    ]
  },
  
];
const rest = new REST({ version: '10' }).setToken(process.env.TOKEN_);

(async () => {
  try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(Routes.applicationCommands(process.env.ClientID), { body: commands });

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
})();


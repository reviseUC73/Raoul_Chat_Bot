# Raoul Chat Bot

This project is a Discord chat bot that utilizes the OpenAI's GPT-3 model for natural language processing and understanding. The bot can respond to user inputs, provide helpful information, and perform various tasks such as setting reminders, answering questions and more.

## Features
- Respond to user inputs in a conversational manner
- Provide helpful information and resources
- Perform tasks such as searching the web and setting reminders

## Setup
1. Create a new bot on the [Discord Developer Portal](https://discord.com/developers/docs/intro) and invite it to your server.
2. Clone this repository and navigate to the project directory.
3. Install the necessary dependencies by running `npm install`.
4. Create a new file called `.env` in the project root and set the following environment variables:
    - `TOKEN_`: The token for your Discord bot.
    - `ClientID`: The client id for your Discord bot.
    - `ChanalID`: The ID for the specific Discord channel that you want your bot to operate in.
    - `GPT_ORG`: The organization name for your OpenAI API key, which is needed to access GPT-3.
    - `GBT_KEY`: The API key for the OpenAI API, which is used to access GPT-3's natural language processing capabilities.
5. Start the bot by running `node index.js` or `nodemon index.js` (if you have nodemon installed)

## Dependency
- [openai](https://openai.com/)
- [discord.js](https://discord.js.org/)

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Note
Please do not share your token and api key publicly, Keep them secret.

// Chamando o discord.js e o arquivo JSON.
const { Client, GatewayIntentBits } = require('discord.js');
const { token } = require('./src/config/config.json');

// Criando um cliente.
const client = new Client({
  intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMembers,
      GatewayIntentBits.GuildModeration,
      GatewayIntentBits.GuildExpressions,
      GatewayIntentBits.GuildIntegrations,
      GatewayIntentBits.GuildWebhooks,
      GatewayIntentBits.GuildInvites,
      GatewayIntentBits.GuildPresences,
      GatewayIntentBits.GuildVoiceStates,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.GuildMessageReactions,
      GatewayIntentBits.GuildMessageTyping,
      GatewayIntentBits.DirectMessages,
      GatewayIntentBits.DirectMessageReactions,
      GatewayIntentBits.DirectMessageTyping,
      GatewayIntentBits.MessageContent,
      GatewayIntentBits.GuildScheduledEvents,
      GatewayIntentBits.AutoModerationConfiguration,
      GatewayIntentBits.AutoModerationExecution,
      GatewayIntentBits.GuildMessagePolls,
      GatewayIntentBits.DirectMessagePolls
    ]
});

// Chamando arquivos necessários e passando "client" para eles.
require('./src/config/commandHandler.js')(client);
require('./src/config/eventHandler.js')(client);

// Iniciando o cliente
client.login(token);
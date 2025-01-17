const { REST, Routes, Collection } = require('discord.js');
const { readdirSync } = require('node:fs');
const { join } = require('node:path');
const { token, clientId } = require('./config.json');
const commands = [];

module.exports = async (client) => {
  client.slashCommands = new Collection();

  const slashCommandsPath = join(__dirname, '../commands');
  const slashCommandsFolder = readdirSync(slashCommandsPath);

  for (const folder of slashCommandsFolder) {
    const slashPath = join(slashCommandsPath, folder);
    const jsfiles = readdirSync(slashPath).filter(s => s.endsWith('.js'));

    for (const file of jsfiles) {
      const slashFile = join(slashPath, file);
      const command = require(slashFile);

      if ('data' in command && 'execute' in command) {
        commands.push(command.data.toJSON());
        client.slashCommands.set(command.data.name, command);
      } else {
        console.log(`[⚠️ AVISO] O comando "${slashFile}" não há uma propriedade "data" ou "execute".`);
      }
    }
  }

  const rest = new REST().setToken(token);

  try {
    console.log(`🔄 Iniciando processo de carregamento de comandos de barra (/)...`);

    const data = await rest.put(Routes.applicationCommands(clientId), { body: commands });

    console.log(`✅ Foram carregados ${data.length} comandos de barra com sucesso!`);
  } catch (error) {
    console.error(error);
  }
}
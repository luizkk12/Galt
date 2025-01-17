const { Events, PermissionsBitField } = require('discord.js');

module.exports = {
  name: Events.InteractionCreate,
  execute: async (interaction) => {
    if (interaction.isChatInputCommand()) {

      const clientCommand = interaction.client.slashCommands.get(interaction.commandName);

      if (!clientCommand) {
        console.log(`🤔 Nenhum comando chamado "${interaction.commandName}" foi encontrado.`);
        return;
      }

      if (interaction.guild) {
        let botPerm = interaction.channel.permissionsFor(interaction.client.user.id);

        if (!botPerm || !botPerm.has(PermissionsBitField.Flags.SendMessages)) {
          console.log(`❌ Não posso enviar mensagens em: ${interaction.channel}.`);
        }
      }

      try {
        clientCommand.execute(interaction);
      } catch (error) {
        console.error(error);
        if (interaction.replied || interaction.deferred) {
	  await interaction.followUp({ content: 'Houve um erro ao executar!', flags: MessageFlags.Ephemeral });
	} else {
	  await interaction.reply({ content: 'Houve um erro ao executar!', flags: MessageFlags.Ephemeral });
        }
      }
    }
  }
}

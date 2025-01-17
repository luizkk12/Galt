const { Events, PermissionsBitField, MessageFlags } = require('discord.js');

module.exports = {
  name: Events.InteractionCreate,
  execute: async (interaction) => {
    let donoBot = '983856696399134751';
    let manuntencao = false;
    let motivoManuntencao = 'Indefinido.';

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

        if (manuntencao === true && interaction.user.id !== donoBot) {
          return interaction.reply({ content: `**<:x_error:1268273212400074825> | Não é possível exexutar meus comandos, pois estou em manutenção! Motivo: \`${motivoManuntencao}\`**`, flags: MessageFlags.Ephemeral });
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
const { SlashCommandBuilder, InteractionContextType, ChannelType, PermissionsBitField, MessageFlags } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
  .setName('say')
  .setDescription('[MODERAÇÃO] Faça-me falar algo por você.')
  .addStringOption(option => option.setName('mensagem').setDescription('Escreva uma mensagem.').setRequired(true))
  .addChannelOption(option => option.setName('canal').setDescription('Mencione algum canal.'))
  .setContexts(InteractionContextType.Guild),

  execute: async (interaction) => {
    let canal = interaction.options.getChannel('canal') ?? interaction.channel;
    let mensagem = interaction.options.getString('mensagem');
    let authorMember = interaction.guild.members.cache.get(interaction.user.id);

    if (!authorMember.permissions.has(PermissionsBitField.Flags.ManageMessages)) {
      return interaction.reply({ content: `**<:x_error:1319711413459095592> | Você precisa da permissão de gerenciar mensagens para executar este comando.**`, flags: MessageFlags.Ephemeral });
    }

    if (canal.type !== ChannelType.GuildText) {
      await interaction.reply({ content: `**<:x_error:1319711413459095592> | Eu só posso enviar mensagens em canais de texto!**`, flags: MessageFlags.Ephemeral });
    } else {
      let authorPermissions = canal.permissionsFor(interaction.user.id);

      if (!authorPermissions.has(PermissionsBitField.Flags.SendMessages) || !authorPermissions.has(PermissionsBitField.Flags.ViewChannel)) {
        await interaction.reply({ content: `**<:x_error:1319711413459095592> | Você não tem permissão para enviar mensagens naquele canal!**`, flags: MessageFlags.Ephemeral });
      } else {
        let botPermissions = canal.permissionsFor(interaction.client.user.id);

        if (!botPermissions.has(PermissionsBitField.Flags.SendMessages) || !botPermissions.has(PermissionsBitField.Flags.ViewChannel)) {
          await interaction.reply({ content: `**<:x_error:1319711413459095592> | Eu não tenho permissão para enviar mensagens naquele canal!**`, flags: MessageFlags.Ephemeral });
        } else {
          if ((mensagem.includes('@everyone') || mensagem.includes('@here')) && !authorMember.permissions.has(PermissionsBitField.Flags.MentionEveryone)) {
            await interaction.reply({ content: `**<:x_error:1319711413459095592> | Você não tem permissão de mencionar "everyone" e "here" na mensagem!**`, flags: MessageFlags.Ephemeral });
          } else {
            canal.send(mensagem).catch(() => interaction.reply({ content: `**<:x_error:1319711413459095592> | Não foi possível enviar a mensagem.**`, flags: MessageFlags.Ephemeral }));

             interaction.reply({ content: `**<a:success:1320748734593765428> | Mensagem enviada com sucesso!**`, flags: MessageFlags.Ephemeral });
          }
        }
      }
    }
  }
}
const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField, ButtonBuilder, ButtonStyle, ActionRowBuilder, MessageFlags } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
  .setName('kick')
  .setDescription('[MODERAÇÃO] Expulse um usuário do servidor.')
  .addUserOption(option => option.setName('usuário').setDescription('Mencione um usuário.').setRequired(true))
  .addStringOption(option => option.setName('motivo').setDescription('Diga um motivo. Caso não escreva nada, o motivo será "Indefinido".')),

  execute: async (interaction) => {
    if (!interaction.guild) {
      return interaction.reply({ content: `**<:x_error:1319711413459095592> | Só é possível executar este comando em servidores!**`, flags: MessageFlags.Ephemeral });
    }

    let user = interaction.options.getUser('usuário');
    let motivo = interaction.options.getString('motivo') || 'Indefinido';

    let member = interaction.guild.members.cache.get(user.id);
    let authorMember = interaction.guild.members.cache.get(interaction.user.id);
    let botMember = interaction.guild.members.cache.get(interaction.client.user.id);

    if (!member) {
      return interaction.reply({ content: `**<:x_error:1319711413459095592> | Este usuário não está no servidor!**`, flags: MessageFlags.Ephemeral });
    }

    if (!authorMember.permissions.has(PermissionsBitField.Flags.KickMembers)) {
      return interaction.reply({ content: `**<:x_error:1319711413459095592> | Você precisa da permissão de expulsar membros para executar este comando.**`, flags: MessageFlags.Ephemeral });
    }

    if (!botMember.permissions.has(PermissionsBitField.Flags.KickMembers)) {
      return interaction.reply({ content: `**<:x_error:1319711413459095592> | Eu não tenho permissão para expulsar membros!**`, flags: MessageFlags.Ephemeral });
    }

    if (member.id === interaction.user.id) {
      return interaction.reply({ content: `**<:x_error:1319711413459095592> | Você não pode se expulsar!**`, flags: MessageFlags.Ephemeral });
    }

    if (member.id === interaction.client.user.id) {
      return interaction.reply({ content: `**🙄 | Eu não vou me punir.**`, flags: MessageFlags.Ephemeral });
    }

    if (authorMember.roles.highest.position <= member.roles.highest.position && interaction.user.id !== interaction.guild.ownerId) {
      return interaction.reply({ content: `**<:x_error:1319711413459095592> | Você não pode expulsar esse usuário porque a posição do cargo mais alto dele é maior ou igual ao do seu cargo mais alto.**`, flags: MessageFlags.Ephemeral });
    }

    if (botMember.roles.highest.position <= member.roles.highest.position) {
      return interaction.reply({ content: `**<:x_error:1319711413459095592> | Eu não posso expulsar esse usuário porque a posição do cargo mais alto dele é maior ou igual ao do meu cargo mais alto!**`, flags: MessageFlags.Ephemeral });
    }

    let confirmButton = new ButtonBuilder()
    .setLabel('Confirmar')
    .setStyle(ButtonStyle.Success)
    .setEmoji('<a:success:1320748734593765428>')
    .setCustomId('kickconfirm');

    let cancelButton = new ButtonBuilder()
    .setLabel('Cancelar')
    .setStyle(ButtonStyle.Danger)
    .setEmoji('<:x_error:1319711413459095592>')
    .setCustomId('kickcancel');

    let row = new ActionRowBuilder()
    .addComponents(confirmButton, cancelButton);

    const msg = await interaction.reply({ content: `**🤔 | Você quer realmente expulsar ${member.user.username} do servidor?**`, components: [row] });

    const coletor = msg.createMessageComponentCollector({ time: 300000 });

    coletor.on('collect', async (i) => {
      if (i.customId === 'kickconfirm') {
        if (i.user.id !== interaction.user.id) {
          return i.reply({ content: `**<:x_error:1319711413459095592> Somente ${interaction.user.username} pode completar essa ação.**`, flags: MessageFlags.Ephemeral });
        }

      let embedSuccess = new EmbedBuilder()
      .setTitle(`**<a:success:1320748734593765428> | Usuário expulso com sucesso!**`)
      .setDescription(`**<:banHammer:1329882827449434194> Usuário expulsado:** <@${member.id}>\n**<:adm:1329883216177533078> Responsável:** <@${interaction.user.id}>\n**📝 Motivo:** ${motivo}.`)
      .setThumbnail(member.displayAvatarURL({ dynamic: true }))
      .setFooter({ text: `Usuário expulso.` })
      .setColor(0x00ff00)
      .setTimestamp();

      await i.deferReply();

      member.kick(motivo).then(async () => {
        await i.followUp({ embeds: [embedSuccess] });
        }).catch(async (err) => {
        await i.followUp({ content: `**<:x_error:1319711413459095592> | Não foi possível expulsar o usuário.**`, flags: MessageFlags.Ephemeral });
        })
      }

      if (i.customId === 'kickcancel') {
        if (i.user.id !== interaction.user.id) {
          return i.reply({ content: `**<:x_error:1319711413459095592> Somente ${interaction.user.username} pode completar essa ação.**`, flags: MessageFlags.Ephemeral });
        }
      (async () => {
        await i.deferUpdate();

        await msg.edit({ content: `**<:x_error:1319711413459095592> | Ação cancelada.**`, components: [] });
        })();
      }
    });

    coletor.on('end', async (collected, reason) => {
      if (reason === 'time') {
        await msg.edit({ content: `**<:x_error:1319711413459095592> | Ação cancelada. O tempo expirou.**`, components: [] });
      }
    });
  }
}
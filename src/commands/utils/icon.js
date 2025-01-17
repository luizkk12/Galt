const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, MessageFlags } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
  .setName('icon')
  .setDescription('[UTILIDADES] Veja o ícone de um servidor ou usuário.')
  .addSubcommand(subcommand => subcommand.setName('user').setDescription('[UTILIDADES] Veja a foto de perfil de um usuário.').addUserOption(option => option.setName('usuário').setDescription('Mencione algum usuário.'))).addSubcommand(subcommand => subcommand.setName('guild').setDescription('[UTILIDADES] Veja o ícone de algum servidor.')),

  execute: async (interaction) => {
    let subcommand = interaction.options.getSubcommand();

    if (subcommand === 'user') {
      let user = interaction.options.getUser('usuário');

      if (!user) user = interaction.user;

      let embed = new EmbedBuilder()
      .setTitle(`**🖼️ | ${user.username}**`)
      .setDescription(`**📸 Para baixar esta foto, clique no botão abaixo.**`)
      .setImage(user.displayAvatarURL({ size: 4096, dynamic: true }))
      .setFooter({ text: `Foto de perfil.` })
      .setColor(0xfaff70)
      .setTimestamp();

      let button = new ButtonBuilder()
      .setLabel('Download')
      .setStyle(ButtonStyle.Link)
      .setEmoji('<:download:1323730030831865957>')
      .setURL(user.displayAvatarURL({ size: 2048, dynamic: true }));

      let row = new ActionRowBuilder()
      .addComponents(button);

      return interaction.reply({ embeds: [embed], components: [row] });
    }

    if (subcommand === 'guild') {
      if (!interaction.guild) {
        return interaction.reply({ content: `**<:x_error:1319711413459095592> | Só é possível executar este comando em servidores!**`, flags: MessageFlags.Ephemeral });
      }

      let icon = interaction.guild.iconURL({ size: 4096, dynamic: true });

      if (!icon) {
        return interaction.reply({ content: `**<:x_error:1319711413459095592> | O servidor não possui um ícone!**`, flags: MessageFlags.Ephemeral });
      }

      let embed = new EmbedBuilder()
      .setTitle(`**🖼️ | ${interaction.guild.name}**`)
      .setDescription(`**📸 Para baixar este ícone, basta clicar no botão abaixo.**`)
      .setImage(icon)
      .setFooter({ text: `Ícone do servidor.` })
      .setColor(0x5ecfff)
      .setTimestamp();

      let button = new ButtonBuilder()
      .setLabel('Download')
      .setStyle(ButtonStyle.Link)
      .setEmoji('<:download:1323730030831865957>')
      .setURL(icon);

      let row = new ActionRowBuilder()
      .addComponents(button);

      return interaction.reply({ embeds: [embed], components: [row] });
    }
  }
}

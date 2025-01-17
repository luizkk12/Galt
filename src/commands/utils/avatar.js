const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder ()
  .setName('avatar')
  .setDescription('🖼️ Veja o avatar de alguém ou o seu próprio!')
  .addUserOption(option => option.setName('usuário').setDescription('Mencione algum usuário.')),

  execute: async (interaction) => {
    let user = interaction.options.getUser('usuário');

    if (!user) user = interaction.user;

    let embed = new EmbedBuilder()
    .setTitle(`**🖼️ | ${user.username}**`)
    .setDescription(`**⬇️ Baixe este avatar clicando no botão abaixo.**`)
    .setImage(user.displayAvatarURL({ size: 4096, dynamic: true }))
    .setFooter({ text: `Comando executado.` })
    .setColor(0x03fcf0)
    .setTimestamp();

    let button = new ButtonBuilder()
    .setLabel('Download')
    .setStyle(ButtonStyle.Link)
    .setURL(user.displayAvatarURL({ size: 4096, dynamic: true }));

    let row = new ActionRowBuilder()
    .addComponents(button);

    await interaction.reply({ embeds: [embed], components: [row] });
  }
}
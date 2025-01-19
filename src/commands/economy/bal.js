const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { conectar, verificarUsuario } = require('../../config/database.js');

conectar();

module.exports = {
  data: new SlashCommandBuilder()
  .setName('bal')
  .setDescription('[ECONOMIA] Veja o seu saldo em diamantes!')
  .addUserOption(option => option.setName('usuário').setDescription('Mencione algum usuário.')),

  execute: async (interaction) => {
    let user = interaction.options.getUser('usuário') || interaction.user;

    let verify = await verificarUsuario(user.id);

    let embed = new EmbedBuilder()
    .setTitle(`**<:money_money:1320417595614036108> | Saldo de ${user.username}.**`)
    .setDescription(`**<:diamond:1319713404075638927> Atualmente, ${user.username} possui ${verify.diamantes} diamantes!**`)
    .setThumbnail(user.displayAvatarURL({ dynamic: true }))
    .setFooter({ text: `Comando executado.` })
    .setColor(0x00ff00)
    .setTimestamp();

    let embed2 = new EmbedBuilder()
    .setTitle(`**<:money_money:1320417595614036108> | Saldo de ${interaction.user.username}.**`)
    .setDescription(`**<:diamond:1319713404075638927> Atualmente, você tem ${verify.diamantes} diamantes!**`)
    .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
    .setFooter({ text: `Comando executado.` })
    .setColor(0x00ff00)
    .setTimestamp();

    if (user.id === interaction.user.id) {
      await interaction.reply({ embeds: [embed2] });
    } else {
      await interaction.reply({ embeds: [embed] });
    }
  }
}
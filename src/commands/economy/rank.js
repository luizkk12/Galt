const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { conectar, User } = require('../../config/database.js');

module.exports = {
  data: new SlashCommandBuilder()
  .setName('rank')
  .setDescription('[ECONOMIA] Veja os 10 usuários com mais diamantes!'),

  execute: async (interaction) => {
    let users = await User.find().sort({ diamantes: -1 });

    users = users.slice(0, 10);

    let embedDescription = '';

    for (let i = 0; i < users.length; i++) {
      let infUser = users[i];
      let user = await interaction.client.users.fetch(infUser.userId);
      embedDescription += `${i + 1}. ${user.username || "Usuário não encontrado"} - ${infUser.diamantes}\n`;
    }

    let embed = new EmbedBuilder()
    .setTitle(`**<:diamond:1319713404075638927> | Top 10 usuários mais ricos!**`)
    .setDescription(embedDescription)
    .setFooter({ text: `Top 10 usuários com mais diamantes.` })
    .setColor(0x00ff00)
    .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  }
}
const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, MessageFlags } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
  .setName('ping')
  .setDescription('📡 Veja a latência do WebSocket.'),

  execute: async (interaction) => {
    let embed = new EmbedBuilder()
    .setTitle(`**<:pp:1319343713234849886> | Pong!**`)
    .setDescription(`**<:wifi:1319343924078182473> Atualmente, a latência do WebSocket é de ${interaction.client.ws.ping} milisegundos.**`)
    .setFooter({ text: `Comando executado com sucesso.` })
    .setColor(0xff0000)
    .setTimestamp();

    let button = new ButtonBuilder()
    .setLabel('Atualizar')
    .setStyle(ButtonStyle.Secondary)
    .setEmoji('🔄')
    .setCustomId('at');

    let row = new ActionRowBuilder()
    .addComponents(button);

    const msg = await interaction.reply({ embeds: [embed], components: [row] });

    const coletor = msg.createMessageComponentCollector();

    coletor.on('collect', async (i) => {
      if (i.customId === 'at') {
        if (i.user.id !== interaction.user.id) {
          await i.reply({ content: `**🫤 É chato, mas você mesmo precisa executar o comando para usar o botão. Use \`/ping\`.**`, flags: MessageFlags.Ephemeral });
        } else {
          await i.deferUpdate();

          let embedUpdated = new EmbedBuilder()
          .setTitle(`**<:pp:1319343713234849886> | Pong!**`)
          .setDescription(`**<:wifi:1319343924078182473> Atualmente, a latência do WebSocket (atualizada) é de ${interaction.client.ws.ping} milisegundos.**`)
          .setFooter({ text: `Comando executado com sucesso.` })
          .setColor(0xff0000)
          .setTimestamp();

          await msg.edit({ embeds: [embedUpdated], components: [row] });
        }
      }
    });
  }
}
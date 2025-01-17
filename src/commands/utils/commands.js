const { SlashCommandBuilder, EmbedBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ActionRowBuilder, MessageFlags } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
  .setName('commands')
  .setDescription('[UTILIDADES] Veja todos os meus comandos!'),

  execute: async (interaction) => {
    let embed = new EmbedBuilder()
    .setTitle(`**❓ | Painel de comandos!**`)
    .setDescription(`**Selecione uma categoria abaixo.**`)
    .setFooter({ text: `Painel de comandos solicitado.` })
    .setColor(0xffffff)
    .setTimestamp();

    let select = new StringSelectMenuBuilder()
    .setCustomId('helpMenu')
    .setPlaceholder('Clique aqui para selecionar!')
    .addOptions(
      new StringSelectMenuOptionBuilder()
      .setLabel('Moderação')
      .setDescription('Veja os comandos de moderação.')
      .setEmoji('<:panda_policial:1320418926903169094>')
      .setValue('modHelp'),
      
      new StringSelectMenuOptionBuilder()
      .setLabel('Diversão')
      .setDescription('Veja os comandos de diversão.')
      .setEmoji('<:circo:1320418217729982567>')
      .setValue('funHelp'),

      new StringSelectMenuOptionBuilder()
      .setLabel('Utilidades')
      .setDescription('Veja os comandos de utilidades.')
      .setEmoji('<:lupa:1320418378380476416>')
      .setValue('utilHelp')
    );

    let row = new ActionRowBuilder()
    .addComponents(select);

    let msg = await interaction.reply({ embeds: [embed], components: [row] });

    let coletor = msg.createMessageComponentCollector();

    coletor.on('collect', async (i) => {
      const selected = i.values[0];

      if (i.customId === 'helpMenu') {
        if (i.user.id !== interaction.user.id) {
          return i.reply({ content: `**🫤 É chato, mas você precisa executar o comando para usar os menus. Use \`/help\`.**`, flags: MessageFlags.Ephemeral });
        }

        if (selected === 'modHelp') {
          await i.deferUpdate();

          let modEmbed = new EmbedBuilder()
          .setTitle(`**<:panda_policial:1320418926903169094> | Moderação!**`)
          .setDescription(`**\`say\`**`)
          .setFooter({ text: `Página 1/3` })
          .setColor(0x405cff)
          .setTimestamp();

          await msg.edit({ embeds: [modEmbed], components: [row] });
        }

        if (selected === 'funHelp') {
          await i.deferUpdate();

          let funEmbed = new EmbedBuilder()
          .setTitle(`**<:circo:1320418217729982567> | Diversão!**`)
          .setDescription(`__**Nenhum comando.**__`)
          .setFooter({ text: `Página 2/3` })
          .setColor(0xff5959)
          .setTimestamp();

          await msg.edit({ embeds: [funEmbed], components: [row] });
        }

        if (selected === 'utilHelp') {
          await i.deferUpdate();

          let utilEmbed = new EmbedBuilder()
          .setTitle(`**<:lupa:1320418378380476416> | Utilidades!**`)
          .setDescription(`**\`ping, info user, info guild, help\`**`)
          .setFooter({ text: `Página 3/3` })
          .setColor(0x636363)
          .setTimestamp();

          await msg.edit({ embeds: [utilEmbed], components: [row] });
        }  
      }
    })
  }
}
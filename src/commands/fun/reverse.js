const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
  .setName('reverse')
  .setDescription('[DIVERSÃO] Inverta algum texto!')
  .addStringOption(option => option.setName('texto').setDescription('Escreva algum texto').setRequired(true)),

  execute: async (interaction) => {
    let texto = interaction.options.getString('texto');

    let textoInvertido = texto.split("").reverse().join("");

    if (texto === textoInvertido) {
      let embed = new EmbedBuilder()
      .setTitle(`**😶 | Nenhuma mudança!**`)
      .setDescription(`**<a:UnoReverse:1319853243546861619> O texto invertido fica a mesma coisa:**\n\n${textoInvertido}`)
      .setFooter({ text: `Texto sem mudanças.` })
      .setColor(0xff0000)
      .setTimestamp();

      return interaction.reply({ embeds: [embed] });
    }

    let embedSuccess = new EmbedBuilder()
    .setTitle(`**🔄 | Texto invertido!**`)
    .setDescription(`**<a:UnoReverse:1319853243546861619> O texto que você mandou fica desse jeito quando invertido:**\n\n${textoInvertido}`)
    .setFooter({ text: `Texto invertido.` })
    .setColor(0xffad14)
    .setTimestamp();

    await interaction.reply({ embeds: [embedSuccess] });
  }
}
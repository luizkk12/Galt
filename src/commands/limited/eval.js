const { SlashCommandBuilder, EmbedBuilder, MessageFlags } = require('discord.js');
const util = require('util');

module.exports = {
  data: new SlashCommandBuilder()
  .setName('eval')
  .setDescription('[LIMITADO] Execute algum código em JavaScript.')
  .addStringOption(option => option.setName('código').setDescription('Digite algum código em JavaScript.').setRequired(true)),

  execute: async (interaction) => {
    let ownerId = '983856696399134751';

    if (interaction.user.id !== ownerId) {
      interaction.reply({ content: `**<:x_error:1319711413459095592> | Somente o meu criador é capaz de usar este comando.**`, flags: MessageFlags.Ephemeral });
    } else {
      let code = interaction.options.getString('código');

      try {
        let resultado = eval(code);

        if (resultado instanceof Promise) {
          resultado = await resultado;
        }

        const result = util.inspect(resultado, { depth: 0 });

        let embed = new EmbedBuilder()
        .setTitle(`**💻 | Código executado!**`)
        .setDescription(`**➡️ Entrada:**\n**\`\`\`js\n${code}\n\`\`\`**\n**⬅️ Saída:**\n**\`\`\`js\n${result}\n\`\`\`**`)
        .setFooter({ text: `Comando executado.` })
        .setColor(0x00ff00)
        .setTimestamp();

        if (interaction.replied) {
          await interaction.followUp({ embeds: [embed] });
        } else {
          await interaction.reply({ embeds: [embed] });
        }
      } catch (err) {
        let embed = new EmbedBuilder()
        .setTitle(`**<:x_error:1319711413459095592> | Erro no código!**`)
        .setDescription(`**\`\`\`js\n${err}\n\`\`\`**`)
        .setFooter({ text: `Comando executado.` })
        .setColor(0xff0000)
        .setTimestamp();

        await interaction.reply({ embeds: [embed] });
      }
    }
  }
}
const { SlashCommandBuilder, InteractionContextType, EmbedBuilder, MessageFlags } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
  .setName('info')
  .setDescription('[UTILIDADES] Veja as informações sobre alguma coisa.')
  .addSubcommand(subcommand => subcommand.setName('user').setDescription('[UTILIDADES] Veja as informações de um usuário!').addUserOption(option => option.setName('usuário').setDescription('Mencione um usuário.'))).addSubcommand(subcommand => subcommand.setName('guild').setDescription('[UTILIDADES] Veja as informações da guilda atual.')),

  execute: async (interaction) => {
    let subcommand = interaction.options.getSubcommand();

    if (subcommand === 'user') {
      let user = interaction.options.getUser('usuário');

      if (!user) user = interaction.user;

      let embed = new EmbedBuilder()
      .setTitle(`**<:info:1321585246940041312> | Informações do usuário.**`)
      .addFields(
      { name: '**<:pessoa:1322565625494638664> Nome de usuário:**', value: user.username },
      { name: '**🆔 ID do usuário:**', value: user.id },
      { name: '**<:calendario:1321585569523826790> Data se criação da conta:**', value: `<t:${Math.trunc(user.createdTimestamp / 1000)}:F> (<t:${Math.trunc(user.createdTimestamp / 1000)}:R>).` },
      { name: '**<:calendario:1321585569523826790> Data de entrada no servidor:**', value: `${interaction.guild?.members.cache.get(user.id) ? `<t:${Math.trunc(interaction.guild.members.cache.get(user.id).joinedTimestamp / 1000)}:F> (<t:${Math.trunc(interaction.guild.members.cache.get(user.id).joinedTimestamp / 1000)}:R>).` : "O usuário não está no servidor."}` }
      )
      .setThumbnail(user.displayAvatarURL({ dynamic: true }))
      .setFooter({ text: `Comando executado.` })
      .setColor(0x42ddf5)
      .setTimestamp();

      return interaction.reply({ embeds: [embed] });
    }

    if (subcommand === 'guild') {

      if (!interaction.guild) {
        return interaction.reply({ content: `**<:x_error:1319711413459095592> | Só é possível executar este comando em servidores!**`, flags: MessageFlags.Ephemeral });
      }

      let dono = await interaction.client.users.cache.get(interaction.guild.ownerId);
      let icon = interaction.guild.iconURL({ size: 4096, dynamic: true });

      let embed = new EmbedBuilder()
      .setTitle(`**<:info:1321585246940041312> |  Informações do servidor!**`)
      .setAuthor({ name: `${interaction.guild.name} (${interaction.guild.id})` })
      .addFields(
      { name: '**<:coroa:1321585376405749902> Dono do servidor:**', value: `${dono.username} (${dono.id})` },
      { name: '**<:pessoas:1321585788755902511> Quantidade de membros:**', value: `${interaction.guild.members.cache.filter(u => !u.user.bot).size} (${interaction.guild.members.cache.size} se considerarmos os bots).` },
      { name: '**<:calendario:1321585569523826790> Data de criação do servidor:**', value: `<t:${Math.trunc(interaction.guild.createdTimestamp / 1000)}:F> (<t:${Math.trunc(interaction.guild.createdTimestamp / 1000)}:R>).` },
      { name: '**💼 Cargos do servidor:**', value: `${interaction.guild.roles.cache.map(r => r.name).join(", ")}.` }
      )
      .setFooter({ text: `Comando executado.` })
      .setColor(0x250385)
      .setTimestamp();

      if (icon) {
        embed.setThumbnail(icon);
      }

      return interaction.reply({ embeds: [embed] });
    }
  }
}
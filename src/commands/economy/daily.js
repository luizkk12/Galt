const { SlashCommandBuilder, EmbedBuilder, MessageFlags } = require('discord.js');
const { conectar, verificarUsuario } = require('../../config/database.js');

conectar();

module.exports = {
  data: new SlashCommandBuilder()
  .setName('daily')
  .setDescription('[ECONOMIA] Colete seu prêmio diário!'),

  execute: async (interaction) => {
    let user = await verificarUsuario(interaction.user.id);

    let saldo = user.diamantes;
    let cooldown = user.daily;
    let agora = Date.now();
    let horas = 24 * 60 * 60 * 1000;
    let proximaVez = cooldown + horas;

    if (agora < proximaVez) {
      let embed = new EmbedBuilder()
      .setTitle(`**<:x_error:1319711413459095592> | Calma aí!**`)
      .setDescription(`**<a:relogio:1319787835028668416> Ainda não se passaram 24 horas desde a última vez que você coletou seu prêmio diário! Colete-o novamente em <t:${Math.trunc(proximaVez / 1000)}:F> (<t:${Math.trunc(proximaVez / 1000)}:R>).**`)
      .setFooter({ text: `Comando executado.` })
      .setColor(0xff0000)
      .setTimestamp();

      return interaction.reply({ embeds: [embed], flags: MessageFlags.Ephemeral });
    }

    let valorGanho = Math.floor(Math.random() * 16) + 5;
    let novoValor = saldo + valorGanho;

    let embedSuccess = new EmbedBuilder()
    .setTitle(`**<a:rich_pepe:1319781834506244117> | Coletado!**`)
    .setDescription(`**<:diamond:1319713404075638927> Você coletou seu prêmio diário e ganhou ${valorGanho} diamantes! Volte novamente daqui a 24 horas.**`)
    .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
    .setFooter({ text: `Comando executado.` })
    .setColor(0x00ff00)
    .setTimestamp();


    user.diamantes = novoValor;
    user.daily = agora;

    await user.save();
    await interaction.reply({ embeds: [embedSuccess] });
  }
}
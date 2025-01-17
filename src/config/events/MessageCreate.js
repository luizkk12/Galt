const { Events, PermissionsBitField, EmbedBuilder } = require('discord.js');

module.exports = {
  name: Events.MessageCreate,
  execute: async (message) => {
    if (message.guild) {
      let botPerm = message.channel.permissionsFor(message.client.user.id);

      if (!botPerm || !botPerm.has(PermissionsBitField.Flags.SendMessages)) {
        console.log(`❌ Não posso enviar mensagens em: ${message.channel}.`);
      }
    }

    if (message.content === `<@${message.client.user.id}>` || message.content === `<@!${message.client.user.id}>`) {
      let embed = new EmbedBuilder()
      .setTitle(`**👋 | Fui mencionado!**`)
      .setDescription(`**<a:pikachu_hi:1321865147077361747> Olá, ${message.author}! Para usar meus comandos, basta digitar "/" no chat. Para ver meus comandos, use \`/help\`.**`)
      .setFooter({ text: `Fui mencionado por ${message.author.username}` })
      .setColor(0xffffff)
      .setTimestamp();

      await message.reply({ embeds: [embed] });
    }
  }
}
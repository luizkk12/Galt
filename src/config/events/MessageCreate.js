const { Events, PermissionsBitField, EmbedBuilder, ChannelType } = require('discord.js');

module.exports = {
  name: Events.MessageCreate,
  execute: async (message) => {
    if (message.content === `<@${message.client.user.id}>` || message.content === `<@!${message.client.user.id}>`) {
      let embed = new EmbedBuilder()
      .setTitle(`**👋 | Fui mencionado!**`)
      .setDescription(`**<a:pikachu_hi:1321865147077361747> Olá, ${message.author}! Para usar meus comandos, basta digitar "/" no chat. Para ver meus comandos, use \`/commands\`.**`)
      .setFooter({ text: `Fui mencionado por ${message.author.username}` })
      .setColor(0xffffff)
      .setTimestamp();

      await message.reply({ embeds: [embed] }).catch(() => console.log(`❌ Não posso enviar mensagens em: ${message.channel.name} (${message.channel.id})`));
    }
  }
}
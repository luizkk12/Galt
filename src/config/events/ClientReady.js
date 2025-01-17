const { Events, ChannelType, ActivityType } = require('discord.js');

module.exports = {
  name: Events.ClientReady,
  once: true,
  execute: (readyClient) => {
    console.log(`[BOT ONLINE] ${readyClient.user.tag} está online.`);

    let atividades = [
      `💻 Sou programado em discord.js, na versão 14!`,
      `😎 Estou em ${readyClient.guilds.cache.size} servidores!`,
       `👀 Estou ajudando ${readyClient.users.cache.filter(u => !u.bot).size} usuários!`,
       `⚙️ Tenho ${readyClient.slashCommands.size} comandos!`,
       `🤩 Estou presente em ${readyClient.channels.cache.filter(c => c.type === ChannelType.GuildText).size} canais!`
    ];

    let index = 0;

    setInterval(() => {
      readyClient.user.setActivity(atividades[index], { type: ActivityType.Playing });
      index = (index + 1) % 5;
    }, 15_000);
  }
}
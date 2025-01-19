const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
  .setName('8ball')
  .setDescription('[DIVERSÃO] Faça uma pergunta e eu lhe responderei!')
  .addStringOption(option => option.setName('pergunta').setDescription('Faça a sua pergunta.').setRequired(true)),

  execute: async (interaction) => {
    let pergunta = interaction.options.getString('pergunta');

    let respostas = [
      `Sim`,
      `Provavelmente sim`,
      `Não`,
      `Provavelmente não`,
      `Não sei`,
      `Pergunte novamente mais tarde`,
      `Eu não acho que seja possível`,
      `Sem chance`
    ];

    let resposta = respostas[Math.floor(Math.random() * respostas.length)];

    await interaction.reply(`**— "__${pergunta}__"**\n\n**<:Magic8Ball:1329920247750197328> | ${resposta}.**`);
  }
}
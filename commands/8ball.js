const Discord = require('discord.js');

exports.run = (client, message, args) => {

    let rep = [
        "Non",
        "Euuuh, enfaite tes qui ?",
        "Uiii",
        "Oui",
        "Peut-être",
        "Hmmmm, sans doute",
        "Pas du tout",
        "Tu serais pas le mec qui es mort hier ?",
        "Je te parle pas je t'aime pas...",
        "Tu me donne combien pour dire oui ?",
        "Je pense",
        "HEIN ?",
        "Si je te dit que je m'en fou, ça va ?",
        "Je m'en b*c",
        "Oui....enfaite non !",
        "M'en fiche ^^"
    ]

    let question = args.slice(0).join(" ")
    if (!args[0]) return message.channel.send('<:nonvalide:723231678075502693> Tu doit me poser une question.')

    const ball_embed = new Discord.MessageEmbed()
        .setColor('#e9d9d9')
        .setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }))
        .addField('**__Question :__**', question)
        .addField('**__Réponse :__**', rep[Math.floor(Math.random() * rep.length)])
    message.channel.send(ball_embed)

};

module.exports.help = {
    name: '8ball'
};

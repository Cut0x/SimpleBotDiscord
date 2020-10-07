const Discord = require('discord.js');

module.exports.run = (client, message, args) => {
    const embed_stats = new Discord.RichEmbed()
        .setColor('BLUE')
        .addField(`Stats de __${client.user.username}__ :`, '```ini' + '\n' + `
+--------------+---------------------+
| Serveurs     | [${client.guilds.size.toLocaleString()}]
+--------------+---------------------+
| Utilisateurs | [${client.users.size.toLocaleString()}]
+--------------+---------------------+
| Salons       | [${client.channels.size.toLocaleString()}]
+--------------+---------------------+
`+ '\n' + '```')
    message.channel.send(embed_stats)
};

module.exports.help = {
    name: 'stats'
};
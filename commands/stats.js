const Discord = require('discord.js');

module.exports.run = (client, message, args) => {
    const embed_stats = new Discord.MessageEmbed()
        .setColor('BLUE')
        .addField(`Stats de __${client.user.username}__ :`, '```ini' + '\n' + `
+--------------+---------------------+
| Serveurs     | [${client.guilds.cache.size.toLocaleString()}]
+--------------+---------------------+
| Utilisateurs | [${client.users.cache.size.toLocaleString()}]
+--------------+---------------------+
| Salons       | [${client.channels.cache.size.toLocaleString()}]
+--------------+---------------------+
`+ '\n' + '```')
    message.channel.send(embed_stats)
};

module.exports.help = {
    name: 'stats'
};

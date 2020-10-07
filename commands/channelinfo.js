const Discord = require('discord.js');
const moment = require('moment');
moment.locale("fr")

module.exports.run = (client, message, args) => {
    
    let channel = client.channels.get(args[0]) || message.channel;

    if (channel.type === "text") {
        type = "https://cdn.discordapp.com/emojis/720282699503370240.png?v=1";
    } else {
        type = "https://cdn.discordapp.com/emojis/720282698345873428.png?v=1";
    }

    if (channel.nsfw === "true") {
        nsfw = "Oui";
    } else {
        nsfw = "Non";
    }

    var embed = new Discord.RichEmbed()
        .setColor('BLUE')
        .setTitle(`Information de __${channel.name}__ :`)
        .addField('**__Nom :__**', '```fix' + '\n' + `${channel.name}` + '\n' + '```', true)
        .addField('**__ID :__**', '```js' + '\n' + `${channel.id}` + '\n' + '```', true)
        .addBlankField()
        .addField('**__Créé le :__**', '```diff' + '\n' + `+ ${moment(channel.createdAt).format('LL')}` + '\n' + '```', true)
        .addField('**__Position Salon :__**', '```diff' + '\n' + `- ${channel.position}` + '\n' + '```', true)
        .addBlankField()
        .addField('**__Salon NSFW :__**', '```js' + '\n' + `${nsfw}` + '\n' + '```', true)
        .addField('**__Description :__**', '```fix' + '\n' + `${channel.topic}` + '\n' + '```', true)
        .setThumbnail(type)
    message.channel.send(embed)
};

module.exports.help = {
    name: "channelinfo"
}

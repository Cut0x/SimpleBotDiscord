const Discord = require('discord.js');

exports.run = async (client, message, args) => {
    message.delete()
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send({
        embed: {
            color: 0xd09d20,
            description: '<:warn:738561291500781611> **Vous devez avoir la permissions `MANAGE_MESSAGES` pour effectuer cette commande.**'
        }
    });
    if (!args[0]) return message.channel.send({
        embed: {
            color: 0xd09d20,
            description: '<:warn:738561291500781611> **Vous devez donner un chiffre de 1 à 100.**'
        }
    });

    message.channel.bulkDelete(args[0]).then(() => {
        message.channel.send({
            embed: {
                description: `<:valide:724025314857975830> ${message.author} **a supprimé \`${args[0]}\` messages.**`
            }
        }).then(msg => {
           msg.delete(5000)
        })
        
   });
};   

module.exports.help = {
    name:"clear"
};
const Discord = require('discord.js')

module.exports.run = async (client, message) => {
    if(!message.guild) return
    let args = message.content.trim().split(/ +/g)
    message.delete()
    
    if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send({
        embed: {
            color: 0xeb0606,
            description: '<:warn:738561291500781611> **Vous devez avoir la permission `ADMINISTRATOR` pour effectuer cette commande.**'
        }
    })
    if(!args[0] || args[0 === "help"]) return message.channel.send({
        embed: {
            color: 0xd09d20,
            title: 'Aide pour __annonce__ (prefix par défaut `.`).',
            description: `> \`${prefix}annonce <ANNONCE>\`\n> \`${prefix}annonce Hello tout le monde....\``,
        }
    })

    let sondage = args.slice(1).join(" ")

    const sondage_embed = new Discord.RichEmbed()
        .setColor("#2f3136")
        .setTitle("Un nouveau sondage à été lancé :")
        .setThumbnail(message.author.avatarURL)
        .setDescription(`**(Fait par : ${message.author})-(\`${message.author.id}\`)**`)
        .addField('** **', sondage)
    message.channel.send(sondage_embed).then(msg => {
        msg.react('724025314857975830')
            .then(() => msg.react('723231678075502693'))
            .catch(() => console.error("Un émoji c'est mal placé..."))
    })
}

module.exports.help = {
    name: "sondage"
}

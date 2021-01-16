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
    if(!args[0] || args[0] === "help") return message.channel.send({
        embed: {
            color: 0xd09d20,
            title: 'Aide pour __annonce__ (prefix par défaut `.`).',
            description: `> \`<prefix>annonce <ANNONCE>\`\n> \`<prefix>annonce Hello tout le monde....\``,
        }
    })

    let sondage = args.slice(1).join(" ")

    const sondage_embed = new Discord.MessageEmbed()
        .setColor("#2f3136")
        .setTitle("Un nouveau sondage à été lancé :")
        .setThumbnail(message.author.avatarURL({ dynamic: true }))
        .setDescription(`**(Fait par : ${message.author})-(\`${message.author.id}\`)**`)
        .addField('** **', sondage)
    const msg = await message.channel.send(sondage_embed)
	Promise.all([
		msg.react('👍'),
		msg.react('👎'),
	])
    .catch(() => message.channel.send("Une erreur est survenue.");
}

module.exports.help = {
    name: "sondage"
}

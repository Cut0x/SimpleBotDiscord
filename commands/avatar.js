const Discord = require("discord.js");

exports.run = (client, message, args) => {

    var user;
    user = message.mentions.users.first();
    if (!user) { 
        if (!args[0]) {
            user = message.author;
            getuseravatar(user);
        } else {
            var id = args[0]
            client.fetchUser(id).then(user => {
                getuseravatar(user)
            }).catch(error => console.log(error))
        }
    } else {
        getuseravatar(user);
    }
    function getuseravatar(user) {
        var embed = new Discord.RichEmbed()
            .setTitle(`Avatar de ${user.username}`)
            .setColor("#e9d9d9")
            .setDescription(`[URL de l'avatar](${user.avatarURL})`)
            .setImage(user.avatarURL)
        message.channel.send(embed)
    } 
};

module.exports.help = {
    name: "avatar",
    aliases: ["AVATAR", "Avatar", "avtre"]
};
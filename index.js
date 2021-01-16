const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const os = require('os')
const cpuStat = require("cpu-stat");
const moment = require("moment")
client.commands = new Discord.Collection()

fs.readdir('./commands/', (err, files) => {
    if(err) console.log(err);
    console.log(`${files.length} commandes`);
    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if(jsfile.length <= 0){
        console.log('Aucune commandes trouvé.');
        return;
    }

    jsfile.forEach((f, i) => {
        let props = require(`./commands/${f}`);
        client.commands.set(props.help.name, props);
    })
});

client.on('ready', () => {
    console.log("+------------------------------------+")
    console.log(`|         Connecté sur Discord       |`)
    console.log("|         Prêt à être utilisé !      |")
    console.log("+------------------------------------+")
    console.log("|            Créé par Cut0x          |")
    console.log("|         ID 574544938440851466      |")
    console.log("+------------------------------------+")

    client.user.setActivity(`!help`, {
        type: "STREAMING",
        url: "https://www.twitch.tv/cut0x"
    })
});

const config = require('./config.json');

client.login(config.token);

client.on('message', async message => {

    let prefix = "!";

    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let Args = messageArray.slice(1);
    var args = message.content.substring(prefix.length).split(" ");

    if(message.content.startsWith(prefix)){
        let commandeFile = client.commands.get(cmd.slice(prefix.length));
        if(commandeFile) commandeFile.run(client, message, Args, args)
    }
})

client.on('guildCreate', function (guild) {

    const chans = client.guilds.cache.get('id_serveur').channels.cache.get('id_salon_vocal')

    const chan = client.guilds.cache.get('id_serveur').channels.cache.get('id_salon_textuel')

    const embed = new Discord.MessageEmbed()
        .setColor('GREEN')
        .setAuthor('Serveur en plus !', guild.iconURL({ dynamic: true }))
        .setThumbnail(guild.iconURL)
        .addField('> **__Serveur Name :__**', '```fix' + '\n' + guild.name + '\n' + '```', true)
        .addField('> **__Serveur ID :__**', '```js' + '\n' + guild.id + '\n' + '```', true)
        .addBlankField()
        .addField('> **__Membre(s) Total :__**', '```js' +  '\n' +guild.memberCount + '\n' + '```', true)
        .addField('> **__Membre(s) Bot(s) :__**', '```js' + '\n' + guild.members.filter(member => member.user.bot).size + '\n' + '```', true)
        .addBlankField()
        .addField('> **__Owner :__**',   '```fix' + '\n' + guild.owner.username+'#'+guild.owner.discriminator + '\n' + '```', true)
        .addField('> **__Owner ID :__**', '```js' + '\n' + guild.owner.id + '\n' + '```', true)
    chan.send(embed)

    chans.setName(`Serveurs : ${client.guilds.cache.size}`)
});

client.on('guildDelete', function (guild) {

    const chans = client.guilds.cache.get('id_serveur').channels.cache.get('id_salon_vocal')

    const chan = client.guilds.cache.get('id_serveur').channels.cache.get('id_salon_textuel')

    const embed = new Discord.MessageEmbed()
        .setColor('RED')
        .setAuthor('Serveur en moins !', guild.iconURL({ dynamic: true }))
        .setThumbnail(guild.iconURL)
        .addField('> **__Serveur Name :__**', '```fix' + '\n' + guild.name + '\n' + '```', true)
        .addField('> **__Serveur ID :__**', '```js' + '\n' + guild.id + '\n' + '```', true)
        .addBlankField()
        .addField('> **__Membre(s) Total :__**', '```js' +  '\n' +guild.memberCount + '\n' + '```', true)
        .addField('> **__Membre(s) Bot(s) :__**', '```js' + '\n' + guild.members.filter(member => member.user.bot).size + '\n' + '```', true)
        .addBlankField()
        .addField('> **__Owner :__**',   '```fix' + '\n' + guild.owner.username+'#'+guild.owner.discriminator + '\n' + '```', true)
        .addField('> **__Owner ID :__**', '```js' + '\n' + guild.owner.id + '\n' + '```', true)
    chan.send(embed)

    chans.setName(`Serveurs : ${client.guilds.cache.size}`)
});

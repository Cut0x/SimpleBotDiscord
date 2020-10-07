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
    console.log(`|          Connecté sur Akira        |`)
    console.log("|         Prêt à être utilisé !      |")
    console.log("+------------------------------------+")
    console.log("|            Créé par Cut0x          |")
    console.log("|         ID 574544938440851466      |")
    console.log("+------------------------------------+")

    client.user.setActivity(`!info | akira-bot.fr`, {
        type: "STREAMING",
        url: "https://www.twitch.tv/cut0x"
    })

    client.guilds.get('717357019602092042').channels.get('726010253740605490').send({
        embed: {
            description: `\`\`\`diff
- +------------------------------------+
- |          Connecté sur Akira        |
- |         Prêt à être utilisé !      |
- +------------------------------------+
- |            Créé par Cut0x          |
- |         ID 574544938440851466      |
- +------------------------------------+
\`\`\``
        }
    })
});

const config = require('./config.json');

client.login(config.token);

// Système de Handler

client.on('message', async message => {

    const prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf-8"));

    if (!prefixes[message.guild.id]) {
        prefixes[message.guild.id] = {
            prefixes: config.prefix
        };
    }

    let prefix = prefixes[message.guild.id].prefixes;

    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let Args = messageArray.slice(1);
    var args = message.content.substring(prefix.length).split(" ");

    if(message.content.startsWith(prefix)){
        let commandeFile = client.commands.get(cmd.slice(prefix.length));
        if(commandeFile) commandeFile.run(client, message, Args, args)
    }
})

// Système de message de bienvenue/Au-revoir

client.on("guildMemberAdd", async(message, member) => {
    let join_channel = JSON.parse(fs.readFileSync("./joint.json", "utf8"))
    if(!join_channel[message.guild.id]) return;
    let c = join_channel[message.guild.id].join_channel
    let channel = client.guilds.get(message.guild.id).channels.get(c) 
    
    client.guilds.get(message.guild.id).channels.get(c).send({
        embed: {
            color: 0x00e1ff,
            description: `Bienvenue ${message.user} sur **${message.guild.name}**.\n\nNous sommes donc **${message.guild.memberCount}** Membres.`,
            thumbnail: {
                url: message.user.avatarURL,
            },
        }
    }).catch(err => {
        console.log(`False est définit sur ${message.guild.name} pour le setRemove.`)
    })
    
    if(!channel) return;
})

client.on("guildMemberRemove", async(message, member) => {
    let remove_channel = JSON.parse(fs.readFileSync("./remove.json", "utf8"))
    if(!remove_channel[message.guild.id]) return;
    let c = remove_channel[message.guild.id].remove_channel
    let channel = client.guilds.get(message.guild.id).channels.get(c)

    client.guilds.get(message.guild.id).channels.get(c).send({
        embed: {
            color: 0xff1e00,
            description: `Au-revoir **${message.user.username}**.\n\nNous sommes donc **${message.guild.memberCount}** Membres.`,
            thumbnail: {
                url: message.user.avatarURL,
            },
        }
    }).catch(err => {
        console.log(`False est définit sur ${message.guild.name} pour le setRemove.`)
    })
    
    if(!channel) return;
})

// Système d'ajout et de retrait

client.on('guildCreate', function (guild) {

    const chan = client.guilds.get('717357019602092042').channels.get('726010283952177252')

    const chans = client.guilds.get('717357019602092042').channels.get('732334645831663676')

    const embed = new Discord.RichEmbed()
        .setColor('GREEN')
        .setAuthor('Serveur en plus !', guild.iconURL)
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

    chans.setName(`〘📥〙Serveurs : ${client.guilds.size}`)
});

client.on('guildDelete', function (guild) {

    const chan = client.guilds.get('717357019602092042').channels.get('726010283952177252')

    const chans = client.guilds.get('717357019602092042').channels.get('732334645831663676')

    const embed = new Discord.RichEmbed()
        .setColor('RED')
        .setAuthor('Serveur en moins !', guild.iconURL)
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

    chans.setName(`Serveurs : ${client.guilds.size}`)
});

// Système de ticket POUR le support

client.on('ready', () => {
    client.guilds.get('717357019602092042').channels.get('741972068475863080').bulkDelete(3)
    let TicketEmbed = new Discord.RichEmbed()
        .setColor("BLUE")
        .setAuthor("Support du serveur")
        .setDescription("Pour créer un ticket, appuyez sur la réaction")
        .setFooter("Support du serveur")
 
    client.guilds.get('717357019602092042').channels.get('741972068475863080').send(TicketEmbed).then(async msg => {
        msg.react("🎟️")
    })
});

client.on("messageReactionAdd", (reaction, user) => {
    if(user.bot) return;
    const message = reaction.message;
    const member = message.guild.members.get(user.id)
    const STAFF = message.guild.roles.find(`id`, '743535638195994634')
    const everyone = message.guild.roles.find(`name`, '@everyone')
 
    if(
        ["🎟️", "🔒"].includes(reaction.emoji.name)
    ) {
        switch(reaction.emoji.name) {
 
            case "🎟️":
 
            var TicketList = [
                `ticket-${message.author.id}`
            ]
 
            let result = Math.floor((Math.random() * TicketList.length))
 
            let categoryID = "745596300350718052";
 
            var bool = false;
 
            if(bool == true) return;
 
            message.guild.createChannel(TicketList[result], "text").then((createChan) => {
 
                createChan.setParent(categoryID).then((settedParent) => {
                    settedParent.overwritePermissions(everyone, {
                        "READ_MESSAGES": false
                    });
 
                    settedParent.overwritePermissions(member, {
                        "SEND_MESSAGES": true,
                        "ADD_REACTIONS": true,
                        "ATTACH_FILES": true,
                        "READ_MESSAGES": true,
                        "READ_MESSAGE_HISTORY": true
                    })
 
                    settedParent.overwritePermissions(STAFF, {
                        "READ_MESSAGES": true,
                        "MANAGE_MESSAGES": true
                    })
 
                    settedParent.overwritePermissions(member, {
                        "SEND_MESSAGES": true,
                        "ADD_REACTIONS": true,
                        "ATTACH_FILES": true,
                        "READ_MESSAGES": true,
                        "READ_MESSAGE_HISTORY": true
                    })
 
                    let embedTicketOpen = new Discord.RichEmbed()
                    .setColor("BLUE")
                    .setDescription("Dîtes vos question / message ici avec un français correct.")
 
                    settedParent.send(embedTicketOpen).then( async msg => {
                        await msg.react("🔒")
                    })
                })
            })
 
            break;
 
            case "🔒":
 
            message.channel.send("**Le salon se fermera dans 4 secondes...**")
 
            setTimeout(() => {
                message.channel.delete()
            }, 4000)
 
            let embedTicketClose = new Discord.RichEmbed()
                .setTitle(`Ticket Supprimé`)
                .setColor("RED")
                .setDescription(`Le salon **${message.channel.name}** à été supprimé avec succès.`)
 
            let logChannel = message.guild.channels.find("id", "745596997901353031")
 
            logChannel.send(embedTicketClose)
            break;
        }
    }
})

// Système de logs
 
client.on("channelCreate", async channel => {
    let mod_channel = JSON.parse(fs.readFileSync("./modLogs.json", "utf8"))
    if(!mod_channel[channel.guild.id]) return;
    let c = mod_channel[channel.guild.id].mod_channel
    let channeld = client.guilds.get(channel.guild.id).channels.get(c)
    client.channels.get(c).send({
        embed: {
            color: 0x00fc51,
            author: {
                name: 'Logs'
            },
            title: `Un salon à été créé.`,
            fields: [
                {
                    name: '**Salon Créé :**',
                    value: `${channel} **=>**` + '`' + channel.name + '`'
                },
                {
                    name: '**ID du salon créé :**',
                    value: '**`' + channel.id + '`**'
                }, {
                    name: '**Type de salon :**',
                    value: '**`' + channel.type + '`**'
                }
            ]
        }
    })
    if (!channeld) return;
})

client.on("channelDelete", async channel => {
    let mod_channel = JSON.parse(fs.readFileSync("./modLogs.json", "utf8"))
    if(!mod_channel[channel.guild.id]) return;
    let c = mod_channel[channel.guild.id].mod_channel
    let channeld = client.guilds.get(channel.guild.id).channels.get(c)
    client.channels.get(c).send({
        embed: {
            color: 0xfa0000,
            author: {
                name: 'Logs'
            },
            title: `Un salon à été supprimé.`,
            fields: [
                {
                    name: '**Salon supprimé :**',
                    value: '**`' + channel.name + '`**'
                },
                {
                    name: '**ID du salon supprimé :**',
                    value: '**`' + channel.id + '`**'
                }, {
                    name: '**Type de salon :**',
                    value: '**`' + channel.type + '`**'
                }
            ]
        }
    })
    if (!channeld) return;
});

var info;

client.on('message', async message => {
    if (message.content === "!info") {

        // Prefix
    
        const prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf-8"));
    
        if (!prefixes[message.guild.id]) {
            prefixes[message.guild.id] = {
                prefixes: "Pas de configuration. Prefix par défaut : `!`"
            };
        }
    
        let prefix = prefixes[message.guild.id].prefixes
    
        const embed = new Discord.RichEmbed()
            .setColor("BLUE")
            .setTitle("Voici la config du serveur :")
            .addField('__Prefix du serveur :__', `**${prefix}**`)
    
        message.channel.send(embed)
    }
});
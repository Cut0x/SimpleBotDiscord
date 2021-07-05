const { Client, Collection, MessageEmbed } = require('discord.js');
const { token, prefix } = require('./setting_bot');

const client = new Client();
client.commands = new Collection();

const { readdirSync } = require("fs");


const commandFiles = readdirSync('./commands').filter(file => file.endsWith('.js'));
const eventFiles = readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
    
	client.commands.set(command.name, command);
}

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args, client));
	} else {
		client.on(event.name, (...args) => event.execute(...args, client));
	}
}

client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

	if (!client.commands.has(command)) return;

	try {
		client.commands.get(command).execute(client, message, args);
	} catch (error) {
		console.error(error);
		message.reply('Une erreur lors de l\'execution de la commande demandé est survenue ! :x:');
	}
});

client.login(token);

/*client.on('guildCreate', function (guild) {

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
});*/

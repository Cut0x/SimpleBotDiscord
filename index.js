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

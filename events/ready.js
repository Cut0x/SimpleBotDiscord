module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		console.log('Je suis prêt !');

        client.user.setActivity("la télé", {
          type: "WATCHING"
        })
	},
};

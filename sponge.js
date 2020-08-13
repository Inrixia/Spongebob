const mockingcase = require('@strdr4605/mockingcase');
const Discord = require('discord.js');
const request = require('request');

const config = require('./config.json')


const client = new Discord.Client();

client.on('ready', () => console.log(`Logged in as ${client.user.tag}!`));
client.on('message', async msg => {
	if (msg.author.id == '398095344766025741') { // Ask
		msg.channel.send(`<@${msg.author.id}>`, {
			files: [(await mock(msg)).data.url]
		});
	}
	// if (msg.author.id == '155530711326130176') { // Inrix
	// 	console.log(await mock(msg))
	// }
});

client.login(config.token);

const mock = msg => {
	return new Promise((resolve, reject) => {
		let strong = mockingcase(msg.content)
		request({
			'method': 'POST',
			'url': 'https://api.imgflip.com/caption_image',
			formData: {
				'template_id': '102156234',
				// 'text0': strong,
				...config.imgflip,
				'font': 'arial',
				'boxes[0][type]': 'text',
				'boxes[0][text]': strong
			}
		}, (err, res) => {
			if (err) console.log(err)
			else resolve(JSON.parse(res.body))
		})
	})
}
const request = require('request');
const FACEBOOK_ACCESS_TOKEN = process.env.FACEBOOK_ACCESS_TOKEN;

module.exports = (senderId, text) => {
	let message = '';
	if (text.attachment && text.attachment.type === 'template') {
		message = text;
	} else if (text.text && !text.quick_replies) {
		message = { text: text.text };
	} else if (text.text && text.quick_replies[0].content_type === 'location') {
		message = text;
	} else {
		message = { text };
	}

	console.log('SENDER ID: ', senderId);
	console.log('TO BE SENT TEXT: ', text);

	request(
		{
			url: 'https://graph.facebook.com/v2.6/me/messages',
			qs: { access_token: FACEBOOK_ACCESS_TOKEN },
			method: 'POST',
			json: {
				recipient: { id: senderId },
				message: message
			}
		},
		(error, response, body) => {
			if (error) {
				console.log('ERORR: ', error);
			} else {
				console.log('SENT SUCCESSFULLY', response.body);
			}
		}
	);
};

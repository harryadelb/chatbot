const Weather = require('../models/weather');

module.exports = (userId, field) => {
	Weather.findOne({ user_id: userId }, function(err, movie) {
		if (err) {
			sendMessage(userId, { text: 'Something went wrong. Try again' });
		} else {
			sendMessage(userId, { text: weather[field] });
		}
	});
};

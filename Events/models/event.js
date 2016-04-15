var db = require('../db');

var Event = db.model('Event', {
    name: { type: String, required: true },
	zip: { type: Number, required: true },
	email: { type: String, required: true },
	kind: { type: String },
	free: { type: Boolean },
	url: { type: String }
})

module.exports = Event;
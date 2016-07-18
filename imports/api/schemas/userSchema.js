Schema = {};

export default userSchema = new SimpleSchema({
	emails: {
		type: Array,
	},
	 "emails.$": {
        type: Object
    },
    "emails.$.address": {
        type: String,
        regEx: SimpleSchema.RegEx.Email
    },
    "emails.$.verified": {
        type: Boolean
    },
    // Make sure this services field is in your schema if you're using any of the accounts packages
    services: {
        type: Object,
        optional: true,
        blackbox: true
    },
    // In order to avoid an 'Exception in setInterval callback' from Meteo
    heartbeat: {
        type: Date,
        optional: true
    },
	createdAt: {
		type: Date
	},
	profile: {
		type: Schema.profileSchema
	}
});

Schema.profileSchema = new SimpleSchema({
	firstName: {
		type: String,
		max: 16
	},
	lastName: {
		type: String,
		max: 16,
	},
	location: {
		type: String,
		optional: true
	},
	ocupation: {
		type: String,
		optional: true
	},
	company: {
		type: String,
		optional: true
	},
	education: {
		type: String,
		optional: true
	},
	summary: {
		type: String,
		optional: true
	},
	friends: {
		type: Array,
		optional: true
	},
	"friends.$": {
		type: Object
	},
	"friends.$.id": {
		type: String
	},
	"friends.$.name": {
		type: String
	},
	collabs: {
		type: Array
	},
	"collabs.$": {
		type: Object
	},
	"collabs.$.id": {
		type: String
	},
	"collabs.$.name": {
		type: String
	}
})
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Messages = new Mongo.Collection('messages');

if (Meteor.isServer) {
	Meteor.publish('viewConvoMessages', function(convo_id) {
		console.log(convo_id)
		return Messages.find({ convoRef: convo_id });
	})
}

Meteor.methods({
	'conversation_post'(post) {
		Messages.insert(post, function(err, data){
			if (err) throw err;
		});
	},
	'add_child'(target) {
		console.log(target)
		Messages.update(target._id,
			{$inc: {children: 1}}
		)
	}

})

messagesSchema = new SimpleSchema({
	convoRef: {
		type: String
	},
	children: {
		type: Number,
		optional: true
	},
	message: {
		type: String
	},
	location: {
		type: Array
	},
	"location.$": {
		type: Number
	},
	sender: {
		type: Object
	},
	'sender.id': {
		type: String
	},
	'sender.firstName': {
		type: String
	},
	'sender.lastName': {
		type: String
	},
	postedAt: {
		type: Date
	}
});

Messages.attachSchema(messagesSchema);
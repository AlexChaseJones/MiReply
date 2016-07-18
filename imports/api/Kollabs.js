import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Kollabs = new Mongo.Collection('kollabs');

if (Meteor.isServer) {
	Meteor.publish('viewConvosForUser', function() {
		let user = Meteor.users.findOne(this.userId);
		let convoIds = user.profile.collabs.map((convo) => {
			return convo.id;
		})
		return Kollabs.find({ _id: { $in: convoIds} })
	})

	Meteor.publish('viewConvo', function(convo_id) {
		return Kollabs.find({ _id: convo_id})
	})
}

Meteor.methods({
	'create_cluster'(cluster) {
		return Kollabs.insert(cluster, function(err, data){
			FlowRouter.redirect('/conversation/view/'+data)
			return data;
		});
	},


})

kollabSchema = new SimpleSchema({
	name: {
		type: String,
	},
	public: {
		type: Boolean
	},
	members: {
		type: Array
	},
	"members.$": {
		type: Object
	},
	"members.$.id": {
		type: String
	},
	"members.$.firstName": {
		type: String
	},
	"members.$.lastName": {
		type: String
	},
	"members.$.position": {
		type: Array
	},
	"members.$.position.$": {
		type: Number
	},
	readers: {
		type: Array,
		optional: true
	},
	"readers.$": {
		type: Object
	},
	"readers.$.id": {
		type: String
	},
	"readers.$.firstName": {
		type: String
	},
	"readers.$.lastName": {
		type: String
	},
	image: {
		type: String
	},
	lastMessage: {
		type: Date
	}
});

Kollabs.attachSchema(kollabSchema);
import userSchema from './schemas/userSchema.js';
import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

if (Meteor.isServer) {
	Meteor.publish('viewUser', function(domain) {
		return Meteor.users.find({ "profile.href": domain }, { fields: { services: 0 } })
	})

	Meteor.publish('viewFriends', function() {
		let user = Meteor.users.findOne(this.userId);
		let friendIds = user.profile.friends.map((friend) => {
			return friend.id;
		})
		return Meteor.users.find({ _id: { $in: friendIds} })
	})
}

if (Meteor.isClient) {
		$('body').css('background-image', 'url("../../../images/backgrounds/iss.jpg")');
		$('body').css('background-attachment', 'fixed');
		$('body').css('background-position', 'center center');
		$('body').css('background-size', 'cover');
}

Meteor.methods({
	'send_friend_request'(friendId) {
		Meteor.users.update(this.userId, 
			{$push:{"profile.friends" :{ id: friendId,
				set: true}}
			}
		);
		Meteor.users.update(friendId,
			{$push:{"profile.friends" :{ id: this.userId,
				set: false}}
			}
		);
	},
	'confirm_friend_request'(friendId) {
		Meteor.users.update({'_id': this.userId, 'profile.friends.id' : friendId},
			{$set: { 'profile.friends.$.set': true }} 
		);
	},
	'confirm_convo_request'(convoId) {
		Meteor.users.update({'_id':this.userId, 'profile.collabs.id': convoId},
			{$set: { 'profile.collabs.$.set': true }} 	
		)
	},
	'add_top_friend'(friendId) {
		let topFriendIds = Meteor.user().profile.topFriends.map((friend) => {//get all top friend Ids
			return friend.id;
		})
		if (topFriendIds.indexOf(friendId) == -1 && topFriendIds.length < 9) {//Check if friend is already a top friend and limits to nine
			Meteor.users.update(this.userId,
				{$push:{"profile.topFriends" : { id: friendId } } }
			);
		}
	},
	'remove_top_friend'(friendId) {
		Meteor.users.update(this.userId,
			{$pull:{"profile.topFriends" : { id: friendId } } },
			false,
			true
		);
	},
	'set_profile_href'(href) {
		if (!href) {
			href = this.userId;
		}
		Meteor.users.update(this.userId,
			{$set: {'profile.href': href}}
		)
	},
	'update_profile_image'(url) {
		Meteor.users.update(this.userId,
			{$set: {'profile.image': url}}
		)
	},
	'update_profile_info'(data) {
		Meteor.users.update(this.userId,
			{$set: data}
		)
	},
	'update_domain'(domain) {
		Meteor.users.update(this.userId,
			{$set: {'profile.href': domain} }
		)
	},
	'add_user_cluster'(clusterId, members) {
		console.log(members)
		Meteor.users.update(this.userId,
			{$push:{"profile.collabs" :{ id: clusterId,
				set: true}}
			}
		)
		console.log(members)
		Meteor.users.update({_id: {$in: members}},
			{$push:{"profile.collabs" :{ id: clusterId,
				set: false}}
			},
			{multi: true}
		);
	},

})
Schema = {};

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
	occupation: {
		type: String,
		optional: true
	},
	birthday: {
		type: String,
		optional: true
	},
	company: {
		type: String,
		optional: true
	},
	education: {
		type: Object,
		optional: true
	},
	"education.degree": {
		type: String,
		optional: true
	},
	"education.institution": {
		type: String,
		optional: true
	},
	"education.graduation": {
		type: String,
		optional: true
	},
	href: {
		type: String
	},
	image: {
		type: String,
		optional: true
	},
	joinDate: {
		type: String,
		optional: true
	},
	summary: {
		type: String,
		optional: true
	},
	topFriends: {
		type: Array,
		optional: true
	},
	"topFriends.$": {
		type: Object
	},
	"topFriends.$.id": {
		type: String
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
	"friends.$.set": {
		type: Boolean
	},
	collabs: {
		type: Array,
		optional: true
	},
	"collabs.$": {
		type: Object
	},
	"collabs.$.id": {
		type: String
	},
	"collabs.$.set": {
		type: Boolean
	}
})

Schema.userSchema = new SimpleSchema({
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

Accounts.users.attachSchema(Schema.userSchema);
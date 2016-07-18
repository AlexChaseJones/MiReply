import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Posts = new Mongo.Collection('posts');

if (Meteor.isServer) {
	Meteor.publish('viewUserPosts', function(user_id) {
		console.log('made it here')
		console.log(user_id)
		return Posts.find({ posterId: user_id });
	})
}

Meteor.methods({
	'insert_post'(post) {
		Posts.insert(post, function(err, data){
			if (err) throw err;
		});
	},

})

postsSchema = new SimpleSchema({
	post: {
		type: String
	},
	posterId: {
		type: String
	},
	postImage: {
		type: String,
		optional: true	
	},
	postedAt: {
		type: Date
	}
});

Posts.attachSchema(postsSchema);
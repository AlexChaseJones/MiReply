import { Meteor } from 'meteor/meteor';
import '../imports/api/Users.js';
import '../imports/api/Kollabs.js';
import '../imports/api/Messages.js';
import '../imports/api/Posts.js';

Meteor.startup(() => {
	//AWS image Upload Directive
	Slingshot.createDirective("myFileUploads", Slingshot.S3Storage, {
	  bucket: "collab-user-images",
	  region: "us-west-2",
	  AWSAccessKeyId: "AKIAJPBLHSCVRHFBXWIQ",
	  AWSSecretAccessKey: "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",

	  acl: "public-read",

	  authorize: function () {
	    //Deny uploads if user is not logged in.
	    return true;
	  },

	  key: function (file) {
	    //Store file into a directory by the user's username.
	    return new Date().getTime() + "_" + file.name;
	  }
	});
});
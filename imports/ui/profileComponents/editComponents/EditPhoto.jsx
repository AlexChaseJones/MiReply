import React, { Component } from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class EditPhoto extends TrackerReact(Component) {
	constructor(props) {
		super(props);
		this.addImage = this.addImage.bind(this);
	}
	
	addImage(e, t) {
		e.preventDefault();
		$('#photo_uploader').prop('disabled', true);
		console.log('yas?')
		var files = this.refs.photo.files;
	    Resizer.resize(files[0], {width: 300, height: 300, cropSquare: true}, function(err, file) {
	    	var uploader = new Slingshot.Upload("myFileUploads");

	    	uploader.send(file, function (err, downloadUrl) {
	        	if (err) console.log(err);
	        	Meteor.call('update_profile_image', downloadUrl, (err, data) => {
	        		if (err) console.log(err)
	        		else if (!err) Bert.alert('Profile image changed!', 'success', 'growl-top-left', 'fa-check');
	        		setTimeout(function(){
	        			$('#photo_uploader').prop('disabled', false);
	        		}, 3000);
	        	})
	      	});
	    });
	}

	render() {
		return (
			<div className="edit_photo">
				<h3>Profile photo</h3>
				<img src={this.props.user.profile.image} />
				<form onSubmit={this.addImage}>
					<input type="file" name="photo" ref="photo" /><br/>
					<button type="submit" id="photo_uploader">Upload</button>
				</form>
			</div>
		)
	}
}

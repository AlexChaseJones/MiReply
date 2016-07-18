import React, { Component } from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class EditInfo extends TrackerReact(Component) {
	constructor(props) {
		super(props);
		this.editValue = this.editValue.bind(this);
		this.updateInfo = this.updateInfo.bind(this);
		this.state = {
			"profile.location": this.props.user.profile.location,
			"profile.occupation": this.props.user.profile.occupation,
			"profile.company": this.props.user.profile.company,
			"profile.education.degree": this.props.user.profile.education.degree,
			"profile.education.institution": this.props.user.profile.education.institution,
			"profile.education.graduation": this.props.user.profile.education.graduation,
			"profile.summary": this.props.user.profile.summary
		}
	}

	editValue(e) {
		let nextState = {};
		nextState[e.target.name] = e.target.value;
		this.setState(nextState)
	}

	updateInfo(e) {
		e.preventDefault();
		$('#photo_uploader').prop('disabled', true);
		console.log(this.state)
		Meteor.call('update_profile_info', this.state, (err, data) => {
			if (err) console.log(err)
			else if (!err) Bert.alert('Profile info updated!', 'success', 'growl-top-right', 'fa-check');
			setTimeout(function(){
				$('#info_updater').prop('disabled', false);
			}, 1000);
		})
	}
	
	render() {
		return (
			<div className="basic_info">
				<h3>Basic Info</h3>
				<form onSubmit={this.updateInfo}>
					<ul>
						<li>
							<label htmlFor="location">Location:</label>
							<input type="text" name="profile.location" value={this.state["profile.location"]} onChange={this.editValue}/>
						</li>
						<li>
							<label htmlFor="location">Occupation:</label>
							<input type="text" name="profile.occupation" value={this.state["profile.occupation"]} onChange={this.editValue}/>
						</li>
						<li>
							<label htmlFor="location">Company:</label>
							<input type="text" name="profile.company" value={this.state["profile.company"]} onChange={this.editValue}/>
						</li>
						<li>
							<label htmlFor="degree">Education:</label>
							<input type="text" name="profile.education.degree" value={this.state["profile.education.degree"]} onChange={this.editValue}/>
						</li>
						<li>
							<label htmlFor="degree">Institution:</label>
							<input type="text" name="profile.education.institution" value={this.state["profile.education.institution"]} onChange={this.editValue}/>
						</li>
						<li>
							<label htmlFor="degree">Graduation:</label>
							<input type="text" name="profile.education.graduation" value={this.state["profile.education.graduation"]} placeholder="June 2016" onChange={this.editValue}/>
						</li>
						<li>
							<label htmlFor="summary">Summary:</label>
							<textarea type="texarea" name="profile.summary" value={this.state["profile.summary"]} onChange={this.editValue}></textarea>
						</li>
					</ul>
					<div className="clearfix"></div>
					<p>NOTE: Any changes you make here will update your public profile, leaving a field empty will erase any previously stored data. </p>
					<button type="submit" id="info_updater">Save Changes</button>
				</form>
			</div>
		)
	}
}

import React, { Component } from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class EditSocial extends TrackerReact(Component) {
	constructor() {
		super();
	}
	
	render() {
		return (
			<div className="social_profiles">
				<h3>Social Profiles</h3>
				<form>
					<ul>
						<li>
							<label htmlFor="facebook"><img src="/images/icons/facebook-icon.png" /></label>
							<input type="url" name="facebook" ref="facebook" />
						</li>
						<li>
							<label htmlFor="linkedin"><img src="/images/icons/linkedin-icon.png" /></label>
							<input type="url" name="linkedin" ref="linkedin" />
						</li>
						<li>
							<label htmlFor="github"><img src="/images/icons/github-icon.png" /></label>
							<input type="url" name="github" ref="github" />
						</li>
						<li>
							<label htmlFor="email"><img src="/images/icons/twitter-icon.png" /></label>
							<input type="email" name="email" ref="email" />
						</li>
					</ul>
					<button type="submit">Save Changes</button>
				</form>
			</div>
		)
	}
}
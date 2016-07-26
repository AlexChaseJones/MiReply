import React, { Component } from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { Meteor } from 'meteor/meteor';

export default class landingPage extends TrackerReact(Component) {
	constructor() {
		super();
		this.createUser = this.createUser.bind(this)
		this.logIn = this.logIn.bind(this)
	}

	componentWillMount() {

	}

	createUser(e) {
		e.preventDefault();

		let date = this.refs.month.value +'-' + this.refs.day.value + '-' + this.refs.year.value;
		if (!moment(date).isValid()) {
			Bert.alert('Not a valid birthday', 'danger', 'fixed-top', 'fa-frown-o');
			return;
		}

		if (this.refs.password.value != this.refs.password2.value) {
			Bert.alert('Passwords do not match', 'danger', 'fixed-top', 'fa-frown-o');
			return
		}
		Accounts.createUser({
			email: this.refs.email.value.trim(),
			password: this.refs.password.value.trim(),
			createdAt: new Date(),
			profile: {
				firstName: this.refs.firstName.value.trim(),
				lastName: this.refs.lastName.value.trim(),
				location: 'not specified',
				occupation: 'not specified',
				company: 'not specified',
				href: 'DEFAULT',
				birthday: date,
				education: {
					degree: 'not specified',
					college: 'not specified',
					graduation: 'not specified'
				},
				joinDate: new Date(),
				summary: 'No summary!',
				image: 'https://s3-us-west-2.amazonaws.com/collab-user-images/1467736023870_default-image.jpg',
				friends: [],
				topFriends: [],
				collabs: [] 
			}
		}, function(err) {
			if (!err) {
				Meteor.call('set_profile_href', (err, data) => {
					if (err) console.log(err)
					FlowRouter.go('/profile/'+ Meteor.user().profile.href)
				})
			} else { console.log(err) }
		})
	}

	logIn(e) {
		let email = this.refs.loginEmail.value.trim();
		let password = this.refs.loginPassword.value
		e.preventDefault();
		Meteor.loginWithPassword(email, password, function(err){
			if (!err) {
				FlowRouter.go('/profile/'+ Meteor.user().profile.href)
			} else {
				console.log(err)
			}
		})
	}

	render(){
		document.body.style.backgroundImage = 'url("/images/backgrounds/saturn.jpg")';
		document.body.style.backgroundColor = 'none';
		if (Meteor.user() && Meteor.user().profile.href != "DEFAULT") {
			FlowRouter.go("/profile/"+ Meteor.user().profile.href);
			return;
		}
		return(
			<div>
				<div className="header">
					<div className="container">
						<div className="logo">
							<img className="nav_img_md" src="../../../images/icons/cluster.png" />		
							<span>MiReply</span>
						</div>
						<div className="login">
							<form onSubmit={this.logIn}>
								<label htmlFor="email">Email:</label>
								<input type="text" name="loginEmail" ref="loginEmail"/>
								<label htmlFor="password">Password:</label>
								<input type="password" name="loginPassword" ref="loginPassword" />
								<button type="submit">Log In</button>
							</form>
						</div>
					</div>
				</div>
				<div id="stella">
					<div className="container">
						<div className="sign_up">
							<h1>Sign Up</h1>
							<h3>It's free and always will be.</h3>
							<form onSubmit={this.createUser}>
								<input type="text" name="firstName" ref="firstName" placeholder="First name" />
								<input type="text" name="lastName" ref="lastName" placeholder="Last name" />
								<input type="email" name="email" ref="email" placeholder="Email" />
								<input type="password" name="password" ref="password" placeholder="Password" />
								<input type="password" name="password2" ref="password2" placeholder="Re-enter password" />
								<h4>Birthday</h4>
								<input list="month" name="month" ref="month" placeholder="Month" />
								<datalist id="month">
									<option value="January" />
									<option value="February" />
									<option value="March" />
									<option value="April" />
									<option value="May" />
									<option value="June" />
									<option value="July" />
									<option value="August" />
									<option value="September" />
									<option value="November" />
									<option value="December" />
								</datalist>
								<input type="number" name="day" ref="day" min="1" placeholder="Day" />
								<input type="number" name="year" ref="year" placeholder="Year" />
								<button type="submit" ><span>Sign Up</span></button>
							</form>
						</div>
						<div className="landing_info">
							 <div className="box_shadow_right"><div className="block_header_sm"></div>
							 	<h1>MiReply</h1>
							 	<div className="line_seperator_md"></div>
							 	<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. <br /><br />Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint o ccaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
							 </div>
						</div>
					</div>
				</div>
				<div className="clearfix"></div>
			</div>
		)
	}
}
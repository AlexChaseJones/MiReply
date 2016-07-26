import React, { Component } from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

import ProfileHeader from './ProfileHeader.jsx';
import ProfileActivity from './ProfileActivity.jsx';
import ProfileAside from './ProfileAside.jsx';

import { Posts } from '../../api/Posts.js';

export default class ProfilePage extends TrackerReact(Component) {
	constructor(props) {
		super(props);
		self = this;
		const subscription =  Meteor.subscribe('viewUser', this.props.href, {
			onReady: function () {self.state.ready = true},
			onStop: function () {self.state.ready = false}
		})
		const subscription2 =  Meteor.subscribe('viewFriends', {
			onReady: function () {
				self.state.ready2 = true;
			}
		})
		this.state = {
				subscription: subscription,
				ready: false,
				ready2: false,
				ready3: false
		}
	}


	render() {
		document.body.style.backgroundImage = 'none';
		document.body.style.backgroundColor = 'rgb(237,237,237)';
		let userData = Meteor.users.find({'profile.href': this.props.href}).fetch();
		let friendData = Meteor.users.find().fetch();
		let user = Meteor.users.find({'profile.href': this.props.href}).fetch();
		if (user.length != 0) {
			console.log(user)
			const subscription3 =  Meteor.subscribe('viewUserPosts', user[0]._id)
		}
		let posts = Posts.find().fetch()
		if (posts) {
			console.log(posts)
		}
		if (userData.length == 0 || friendData.length == 0 || !Meteor.user()) {
			return(<div className="loader">Loading...</div>)
		} else {
			return (
			<div>
				<div className="header">
					<div className="container">
						<div className="logo">
							<img className="nav_img_md" src="/images/icons/cluster.png" />		
							<span>MiReply</span>
						</div>
						<div className="nav">
							<ul>
								<a href="/home"><li>
									<img className="nav_img" src="/images/icons/earth.png" /> 
									<span>HOME</span>
								</li></a>
								<a href="/convos"><li>
									<img className="nav_img" src="/images/icons/cluster.png" /> 
									<span>CONVERSATIONS</span>
								</li></a>
								<a href="/friends"><li>
									<img className="nav_img" src="/images/icons/earth.png" /> 
									<span>FRIENDS</span>
								</li></a>
								<a href={"/profile/" + Meteor.user().profile.href}><li>{Meteor.user().profile.firstName}</li></a>
							</ul>
						</div>
					</div>
				</div>
				<div id="stella">
					<div className="container">
						<div className="main_left">
							<ProfileHeader user={userData[0]} />

							<ProfileActivity user={userData[0]} posts={posts}/>
						</div>

						<div className="aside_right">
							<ProfileAside user={userData[0]} friends={friendData}/>
						</div>		
					</div>
				</div>
			</div>
			)
		}
	}
}
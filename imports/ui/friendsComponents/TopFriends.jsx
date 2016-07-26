import React, { Component } from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

import TopFriendCard from '../iterate/TopFriendCardv2.jsx';

export default class TopFriends extends TrackerReact(Component) {
	constructor() {
		super();
	}

	renderTopFriends() {
		topFriends = [];
		Meteor.user().profile.topFriends.forEach((topFriend) => {
			this.props.friends.forEach((friend) => {
				if (topFriend.id == friend._id) {
					topFriends.push(<TopFriendCard updateCount={this.props.updateCount} user={friend} key={friend._id} />)
				}
			})
		})
		if (topFriends.length == 0) {
			topFriends.push(<h1 key='123'>No top Friends!</h1>)
		}
		return topFriends;

	}

	render() {
		if (this.props.friends == 0) {
			return(
				<div className="friends_welcome">
					<h1>Welcome to your friends list!</h1>
					<p>This is where all of your friends will show up as soon as you start adding them.</p>
					<p>MiReply currently exists on a closed network, this means that to find others, you have to find them by their personal URL.</p>
					<p>To set your own personal URL, head over to the <a href="/edit">edit profile</a> section and at the bottom right you can update your personal domain. Share your newly created link to connect with friends!</p>
				</div>
			)
		} else {
			return (
				<div className="top_friends">
						{ this.renderTopFriends() }
				</div>
			)
		}
	}
}
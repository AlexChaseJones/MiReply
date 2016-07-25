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
		return (
			<div className="top_friends">
					{ this.renderTopFriends() }
			</div>
		)
	}
}
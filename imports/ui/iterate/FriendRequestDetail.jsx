import React, { Component } from 'react';

export default class FriendRequestDetail extends Component {
	constructor() {
		super();
		this.handleHref = this.handleHref.bind(this)
		this.confimFriend = this.confimFriend.bind(this)
	}

	handleHref() {
		window.location = '/profile/'+this.props.user._id
	}

	confimFriend() {
		Meteor.call('confirm_friend_request', this.props.user._id,  (err, data) => {
			if (err) console.log(err)
			this.props.updateFriends();

		})
	}

	render() {
		return (
			<div className="request">
				<p >
					<span onClick={this.handleHref}>{this.props.user.profile.firstName}  {this.props.user.profile.lastName}</span> wants to be your friend.
				</p>
				<img onClick={this.confimFriend} src="/images/icons/add-friend.png" />
				<img src="/images/icons/remove.png" />
			</div>
		)
	}
}
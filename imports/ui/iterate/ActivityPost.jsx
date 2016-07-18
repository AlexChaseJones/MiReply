import React, { Component } from 'react';

export default class FriendRequestDetail extends Component {
	constructor() {
		super();
	}

	render() {
		return (
			<div className="activity_card">
				<h3>
					<span>{this.props.user.profile.firstName} {this.props.user.profile.lastName}</span> updated his status.
				</h3>
				<img src={this.props.user.profile.image} />
				<div className="activity_details">
					{this.props.post.post}
				</div>
				<h4>32 minutes ago</h4>
				<div className="clearfix"></div>
			</div>
		)
	}
}
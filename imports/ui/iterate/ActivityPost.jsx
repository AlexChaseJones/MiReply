import React, { Component } from 'react';

export default class FriendRequestDetail extends Component {
	constructor() {
		super();
	}

	getTime() {

	}

	render() {
		return (
			<div className="activity_card">
				<h3>
					<span>{this.props.user.profile.firstName} {this.props.user.profile.lastName}</span>
				</h3>
				<img src={this.props.user.profile.image} />
				<div className="activity_details">
					{this.props.post.post}
				</div>
				<h4 data-livestamp={this.props.post.postedAt}></h4>
				<div className="clearfix"></div>
			</div>
		)
	}
}
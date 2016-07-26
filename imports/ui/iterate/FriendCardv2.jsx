import React, { Component } from 'react';

export default class FriendCardv2 extends Component {
	constructor() {
		super();
		this.addToTopFriends = this.addToTopFriends.bind(this);
		this.handleHref = this.handleHref.bind(this);
		this.handleCreateHref = this.handleCreateHref.bind(this);
	}

	addToTopFriends() {
		console.log(this.props.user._id)
		Meteor.call('add_top_friend', this.props.user._id, (err, data) => {
			if (err) console.log(err)
			this.props.updateCount()
		})
	}

	handleHref() {
		FlowRouter.go('/profile/'+this.props.user.profile.href)
	}

	handleCreateHref() {
		FlowRouter.go("/create/convo/?Id=" + this.props.user._id + "&user=" + this.props.user.profile.firstName + ' ' + this.props.user.profile.lastName)
	}

	render() {
		return (
				<div className="friend_card_sm">
					<div className="contained">
						<img onClick={this.handleHref} src={this.props.user.profile.image} />
						<h2 onClick={this.handleHref}>{this.props.user.profile.firstName} <br/>{this.props.user.profile.lastName}</h2>
						<div className="options">
							<div className="reply_block_sm" onClick={this.handleCreateHref} >
								<img src="/images/icons/reply-v2.png" />
								<h4 onClick={this.handleCreateHref}>Start a new Convo</h4>
							</div>
							<div className="edit_block_sm">
								<img src="/images/icons/edit-v2.png" />
								<h4 onClick={this.addToTopFriends}>Add to Top Friends</h4>
							</div>
						</div>
					</div>
				</div>
		)
	}
}
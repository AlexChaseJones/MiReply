import React, { Component } from 'react';

export default class TopFriendCardv2 extends Component {
	constructor(props) {
		super(props);
		this.removeFromTopFriends = this.removeFromTopFriends.bind(this);
		this.handleHref = this.handleHref.bind(this);
		this.handleCreateHref = this.handleCreateHref.bind(this);
	}

	handleHref() {
		FlowRouter.go('/profile/'+this.props.user.profile.href);
	}

	handleCreateHref() {
		FlowRouter.go('/create/convo/?Id=' + this.props.user._id + '&user=' + this.props.user.profile.firstName + ' ' + this.props.user.profile.lastName)
	}

	removeFromTopFriends() {
		Meteor.call('remove_top_friend', this.props.user._id, (err, data) => {
			if (err) console.log(err)
			this.props.updateCount()
		})
	}


	render() {
		return (
			<div key={this.props.user._id}>
				<div className="friend_card">
					<div className="contained">
						<img onClick={this.handleHref} src={this.props.user.profile.image} />
						<h2 onClick={this.handleHref}>{this.props.user.profile.firstName} {this.props.user.profile.lastName}</h2>
						<h3 onClick={this.handleCreateHref}>Start a<br />New Convo</h3>
						<p>or</p>
						<h4 onClick={this.handleHref}>View Profile</h4>
						<div className='edit_block'>
							<h6 onClick={this.removeFromTopFriends}>Remove from Top Friends</h6>
							<h5>Edit</h5>
						</div>
					</div>
				</div>
			</div>
		)
	}
}
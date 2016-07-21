import React, { Component } from 'react';

export default class FriendCard extends Component {
	constructor() {
		super();
		this.addToTopFriends = this.addToTopFriends.bind(this);
		this.handleHref = this.handleHref.bind(this);
	}

	addToTopFriends() {
		console.log(this.props.user._id)
		Meteor.call('add_top_friend', this.props.user._id, (err, data) => {
			if (err) console.log(err)
			this.props.updateCount()
		})
	}

	handleHref() {
		window.location = '/profile/'+this.props.user.profile.href
	}

	render() {
		return (
			<div className="sub_friend_card_3d_container">
				<div className="sub_friend_card">
					<figure className="front">
						<div className="contained">
							<div onClick={this.handleHref} className="friend_image_container">
								<img src={this.props.user.profile.image} />
							</div>
							<h2 onClick={this.handleHref}>{this.props.user.profile.firstName} <br/>{this.props.user.profile.lastName}</h2>
							<a href={"/create/convo/?Id=" + this.props.user._id + "&user=" + this.props.user.profile.firstName + ' ' + this.props.user.profile.lastName } className="add_cluster">
								<img src="/images/icons/add-cluster-blk.png" />
								<h4>New Cluster</h4>
							</a>
							<img className="flip_icon_up" src="/images/icons/flipper.png" />
						</div>
					</figure>
					<figure className="back">
						<div className="contained">
							<div className="delete_friend">
								<img src="/images/icons/close.png" />
								<h4>Delete</h4>	
							</div>
							<div onClick={this.addToTopFriends} className="remove_top"> {/* WARNING - MISSLEADING CLASS NAME, will fix l8r =] */}
								<img src="/images/icons/remove-top-friend.png" />
								<h3>Add to Top Friends</h3>
							</div>
							<img className="flip_icon_up" src="/images/icons/flipper.png" />
						</div>
					</figure>
				</div>
			</div>
		)
	}
}
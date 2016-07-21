import React, { Component } from 'react';

export default class TopFriendCard extends Component {
	constructor(props) {
		super(props);
		this.removeFromTopFriends = this.removeFromTopFriends.bind(this);
		this.handleHref = this.handleHref.bind(this);
	}

	handleHref() {
		window.location = '/profile/'+this.props.user.profile.href;
	}

	removeFromTopFriends() {
		Meteor.call('remove_top_friend', this.props.user._id, (err, data) => {
			if (err) console.log(err)
			this.props.updateCount()
		})

	}

	render() {
		return (
			<div className="friend_card_3d_container" key={this.props.user._id}>
				<div className="friend_card">
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
							<img className="flip_icon" src="../../../images/icons/flipper.png" />
						</div>
					</figure>
					<figure className="back">
						<div className="contained">
							<div onClick={this.removeFromTopFriends} className="remove_top">
								<img src="../../../images/icons/remove-top-friend.png" />
								<h3>Remove from Top Friends</h3>
							</div>
							<div className="delete_friend">
								<img src="../../../images/icons/close.png" />
								<h4>Delete</h4>	
							</div>
							<img className="flip_icon" src="../../../images/icons/flipper.png" />
						</div>
					</figure>
				</div>
			</div>
		)
	}
}
import React, { Component } from 'react';

export default class ProfileHeader extends Component {
	constructor() {
		super();
		this.requestFriend = this.requestFriend.bind(this)
		this.confirmFriend = this.confirmFriend.bind(this)
	}

	showButton() {
		if (this.props.user._id == Meteor.userId()) { //i.e. if the current user is viewing his own profile
			return (<a href="/edit"><button id="edit_profile">Edit Profile</button></a>)
		} else {
			let found = false;
			for (var i=0; i < Meteor.user().profile.friends.length; i++) {
				if ( Meteor.user().profile.friends[i].id == this.props.user._id) { //i.e. if the current user has added the viewed user as a friend
					if ( Meteor.user().profile.friends[i].set ) { //i.e. if the current user has a set friendship with the viewed user on their side. (represents current friend status or pending status)
						found = true;
					} else {//i.e if the current user has been added but the set key is FALSE, then this means the viewed user has sent them a friend request.
						return (<button onClick={this.confirmFriend} id="pending_response">Reply To Request</button>)
					}
					break;
				}
			}
			if (!found) { //i.e. if the above loop never found the viewed user in the current user friends array
				return (<button onClick={this.requestFriend} id="add_friend">Connect</button>)
			}

			for (var i = 0; i < this.props.user.profile.friends.length; i++) {
				if ( this.props.user.profile.friends[i].id == Meteor.userId() ) {//i.e. finds the current user in the viewed users friends array
					if ( this.props.user.profile.friends[i].set ) { //i.e. checks if the viewed user has set their friendship yet.
						return (<a href={"/create/convo/?Id=" + this.props.user._id + "&user=" + this.props.user.profile.firstName + ' ' + this.props.user.profile.lastName }><button id="msg_friend">New Convo</button></a>)
					} else {
						return (<button id="pending_friend">Request Pending</button>)
					}
				}
			}
		}
	}

	requestFriend() {
		Meteor.call('send_friend_request', this.props.user._id, (err, data) => {
			if (err) console.log(err)
		})
	}

	confirmFriend() {
		Meteor.call('confirm_friend_request', this.props.user._id, (err, data) => {
			if (err) console.log(err)
		})
	}

	render() {
		return (
			<div className="home_feed_block box_shadow_left">
				<div className="block_header_sm"></div>
				<div className="main_content">
					<div className="profile_info">
						<div className="profile_image_container">
							<img src={this.props.user.profile.image} />
						</div>
						<div className="profile_details">
							<h1>{this.props.user.profile.firstName} {this.props.user.profile.lastName}</h1>
							<div className="line_seperator_lg"></div>
							<table>
								<tbody>
									<tr>
										<td>Location:</td>
										<td>{this.props.user.profile.location}</td>
									</tr>
									<tr>
										<td>Occupation:</td>
										<td>{this.props.user.profile.occupation}</td>
									</tr>
									<tr>
										<td>Company:</td>
										<td>{this.props.user.profile.company}</td>
									</tr>
									<tr>
										<td>Education:</td>
										<td>{this.props.user.profile.education.degree}<br />{this.props.user.profile.education.institution}<br />{this.props.user.profile.education.graduation}</td>
									</tr>
									<tr>
										<td>Join Date:</td>
										<td>{moment((new Date(this.props.user.profile.joinDate)).toDateString(), "ddd MMM DD YYYY").format("dddd, MMMM Do YYYY")}</td>
									</tr>
								</tbody>
							</table>
							{ this.showButton() }
						</div>
						<div className="clearfix"></div>
					</div>
				</div>
			</div>
		)
	}
}
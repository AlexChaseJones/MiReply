import React, { Component } from 'react';
import FriendRequestDetail from '../iterate/FriendRequestDetail.jsx';
import ConvoRequestDetail from '../iterate/ConvoRequestDetail.jsx';
import { Kollabs } from '../../api/Kollabs.js';


export default class Requests extends Component {
	constructor() {
		super();
	}

	getFriendRequests() {
		let friendRequests = Meteor.user().profile.friends.map((friend) => {
			if (!friend.set) return friend.id
		})
		friendRequests = friendRequests.filter((fr) => {return fr != undefined})
		friendRequests = Meteor.users.find({_id: {$in: friendRequests}}).fetch()
		return friendRequests.map((friend) => {
			return (<div><FriendRequestDetail user={friend} key={friend._id} /><div className="line_seperator"></div></div>)
		})
	}	

	getConvoRequests() {
		let convoRequests = Meteor.user().profile.collabs.map((convo) => {
			if (!convo.set) return convo.id
		})
		convoRequests = convoRequests.filter((fr) => {return fr != undefined})
		convoRequests = Kollabs.find( {_id: { $in: convoRequests } }).fetch()
		return convoRequests.map((convo) => {
			return (<div><ConvoRequestDetail convo={convo} key={convo._id} /><div className="line_seperator"></div></div>)
		})
	}

	render() {
		return (
			<div className="aside_block box_shadow_left">
				<div className="block_header">
					<span>Requests</span>
				</div>
				<div className="rq_content">
					{ this.getFriendRequests() }
					{ this.getConvoRequests() }
				</div>
			</div>
		)
	}
}
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
			return (<div><FriendRequestDetail updateFriends={this.props.update} user={friend} key={friend._id} /><div className="line_seperator"></div></div>)
		})
	}	

	getConvoRequests() {
		let convoRequests = Meteor.user().profile.collabs.map((convo) => {
			if (!convo.set) return convo.id
		})

		convoRequests = convoRequests.filter((fr) => {return fr != undefined})
		convoRequests = Kollabs.find( {_id: { $in: convoRequests } }).fetch()
		return convoRequests.map((convo) => {
			return (<div><ConvoRequestDetail updateConvos={this.props.update} convo={convo} key={convo._id} /><div className="line_seperator"></div></div>)
		})
	}

	default() {
		let convoRequests = Meteor.user().profile.collabs.map((convo) => {
			if (!convo.set) return convo.id
		})
		convoRequests = convoRequests.filter((fr) => {return fr != undefined})
		convoRequests = Kollabs.find( {_id: { $in: convoRequests } }).fetch()
		let friendRequests = Meteor.user().profile.friends.map((friend) => {
			if (!friend.set) return friend.id
		})
		friendRequests = friendRequests.filter((fr) => {return fr != undefined})
		friendRequests = Meteor.users.find({_id: {$in: friendRequests}}).fetch()

		if (convoRequests.length == 0 && friendRequests.length == 0) {
			return (
				<div className="default_requests">
					<h1>No Requests :)</h1>
				</div>
			)
		}
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
					{ this.default() }
				</div>
			</div>
		)
	}
}
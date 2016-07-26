import React, { Component } from 'react';

import FriendCard from '../iterate/FriendCardv2.jsx';

export default class AllFriends extends Component {
	constructor() {
		super();
		this.state = {
			filteredFriends: []
		}
	}

	componentWillMount() {
		let friends = this.props.friends.map((friend) => {
			console.log(friend)
			if (friend._id != Meteor.userId()) {
				return (<FriendCard user={friend} updateCount={this.props.updateCount} key={friend._id} />)
			}
			return null
		})
		if (friends.length == 0) {
			let friends = [];
			friends.push(<h1 key='1'>No Friends</h1>)
		}
		this.setState({
			filteredFriends: friends
		})
	}

	filterFriends() {
		console.log(this.refs.filter_friends.value)
		let friends = this.props.friends.map((friend) => {
			let fullName = friend.profile.firstName + ' ' + friend.profile.lastName;
			if (fullName.toLowerCase().indexOf(this.refs.filter_friends.value.toLowerCase()) >= 0 ) { //This checks for the input in the name of friends and returns the friend if true
				return (<FriendCard user={friend} key={friend._id} />)
			}
		})
		if (friends.length == 0) {
			let friends = [];
			friends.push(<h1 key='1'>No Friends</h1>)
		}
		console.log(friends)
		this.setState({
			filteredFriends: friends
		})
	}

	componentWillReceiveProps(nextProps) {
		let friends = nextProps.friends.map((friend) => {
			console.log(friend)
			if (friend._id != Meteor.userId()) {
				return (<FriendCard user={friend} updateCount={this.props.updateCount} key={friend._id} />)
			}
			return null
		})
		if (friends.length == 0) {
			let friends = [];
			friends.push(<h1 key='1'>No Friends</h1>)
		}
		this.setState({
			filteredFriends: friends
		})
	}

	render() {
		if (this.props.friends == 0) {
			return(
				<div className="friends_welcome">
					<h1>No Friends to show!</h1>
				</div>
			)
		} else {
			return (
				<div className="allFriends">
					<form id="filter_friends">
						<input type="text" name="filter_friends" ref="filter_friends" onInput={ this.filterFriends.bind(this) } placeholder="Search for a friend" />
					</form>
					{ this.state.filteredFriends }
				</div>
			)
		}
	}
}
import React, { Component } from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

import RecentKollabs from '../reusableComponents/RecentKollabs.jsx';
import Requests from '../reusableComponents/Requests.jsx';
import TopFriends from './TopFriends.jsx';
import AllFriends from './AllFriends.jsx';

export default class FriendsMain extends TrackerReact(Component) {
	constructor() {
		super();
		self = this;
		this.updateCount = this.updateCount.bind(this);
		const subscription =  Meteor.subscribe('viewFriends', {
			onReady: function () {
				self.state.ready = true;
				self.updateCount();
			}
		})
		this.state = {
				subscription: subscription,
				ready: false,
				friendCount: 0
		}
	}

	updateCount() {
		console.log('here')
		this.setState({
			friendCount: Meteor.user().profile.topFriends.length
		})
	}

	render() {
		let friendsData = [];
		if (Meteor.user()) {
			let confirmedFriends = Meteor.user().profile.friends.map((friend) => {
				if (friend.set) {
					return friend.id
				} else return
			});

			confirmedFriends = confirmedFriends.filter((cf) => {return cf != undefined})
				console.log(confirmedFriends)
			friendsData = Meteor.users.find({_id : {$in: confirmedFriends}}).fetch();
		}

		if (friendsData.length == 0) {
			return(<div className="loader">Loading...</div>)
		} else {
			console.log(friendsData)
			return (
			<div>
				<div className="header">
					<div className="container">
						<div className="logo">
							<img className="nav_img_md" src="../../../images/icons/cluster.png" />		
							<span>Cluster</span>
						</div>
						<div className="nav">
							<ul>
								<a href="/homePage.html"><li>
									<img className="nav_img" src="../../../images/icons/earth.png" /> 
									<span>HOME</span>
								</li></a>
								<a href="/convos"><li>
									<img className="nav_img" src="../../../images/icons/cluster.png" /> 
									<span>CLUSTERS</span>
								</li></a>
								<a href="/friends"><li>
									<img className="nav_img" src="../../../images/icons/earth.png" /> 
									<span>FRIENDS</span>
								</li></a>
								<a href={"/profile/" + Meteor.user().profile.href}><li>{Meteor.user().profile.firstName}</li></a>
							</ul>
						</div>
					</div>
				</div>
				<div id="stella">
					<div className="container">
						<div className="aside_left">
							<RecentKollabs />

							<Requests />
						</div>

						<div className="main_right">
							<div className="home_feed_block box_shadow_right">
								<div className="block_header">
									<span>Friends</span>
								</div>
								<div className="main_content">
									<TopFriends friends={friendsData} friendCount={this.state.friendCount} updateCount={this.updateCount}/>
									<div className="line_seperator_lg"></div>
									<AllFriends friends={friendsData} updateCount={this.updateCount}/>
								</div>
							</div>
						</div>		
					</div>
				</div>
				<script src="scripts/cardFlips.js"></script>
			</div>
			)
		}
	}
}
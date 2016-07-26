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
		this.setIntialState = this.setIntialState.bind(this);
		const subscription =  Meteor.subscribe('viewFriends', {
			onReady: function () {
				self.state.ready = true;

				self.setIntialState();
			}
		})
		this.state = {
				subscription: subscription,
				ready: false,
				friendCount: 0,
				friends: 'banana'
		}
	}

	setIntialState() {
		debugger;
		if (Meteor.user()) {
			let confirmedFriends = Meteor.user().profile.friends.filter((friend) => { //This filters out the set true friends on User side.
				if (friend.set) return true;
				else return false;
			}).map((friend) => {
				return friend.id;
			});

			friendsData = Meteor.users.find({_id : {$in: confirmedFriends}}).fetch();

			friendsData = friendsData.filter((friend) => {
				for (var i = 0; i < friend.profile.friends.length; i++) {
					if (friend.profile.friends[i].id == Meteor.userId()) {
						if (friend.profile.friends[i].set) {
							return friend;
						}
					}
				}
			})

			this.setState({
				friendCount: Meteor.user().profile.topFriends.length,
				friends: friendsData
			})
		}
	}

	generateFriends() {
		if (this.state.friends == "banana") {
			return(<div className="loader">Loading...</div>)
		} else {
			return (
			<div>
				<div className="home_feed_block box_shadow_right">
					<div className="block_header">
						<span>Top Friends</span>
					</div>
					<div className="main_content">
						<TopFriends 
							friends={this.state.friends} 
							updateCount={this.updateCount}
						/>
					</div>
				</div>
				<div className="home_feed_block box_shadow_right">
					<div className="block_header">
						<span>All Friends</span>
					</div>
					<div className="main_content">	
						<AllFriends 
							friends={this.state.friends} 
							updateCount={this.updateCount}
						/>
					</div>
				</div>
			</div>
			)
		}
	}

	render() {
		document.body.style.backgroundImage = 'none';
		document.body.style.backgroundColor = 'rgb(246,240,235)';
		if (Meteor.user()) {
			return (
			<div>
				<div className="header">
					<div className="container">
						<div className="logo">
							<img className="nav_img_md" src="../../../images/icons/cluster.png" />		
							<span>MiReply</span>
						</div>
						<div className="nav">
							<ul>
								<a href="/homePage.html"><li>
									<img className="nav_img" src="../../../images/icons/earth.png" /> 
									<span>HOME</span>
								</li></a>
								<a href="/convos"><li>
									<img className="nav_img" src="../../../images/icons/cluster.png" /> 
									<span>CONVERSATIONS</span>
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

							<Requests update={this.setIntialState} />
						</div>

						<div className="main_right">
									{ this.generateFriends() }
						</div>		
					</div>
				</div>
				<script src="scripts/cardFlips.js"></script>
			</div>
			)
		} else {
			return(<div className="loader">Loading...</div>)
		}
	}
}
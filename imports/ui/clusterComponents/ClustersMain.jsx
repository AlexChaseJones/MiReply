import React, { Component } from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import RecentKollabs from '../reusableComponents/RecentKollabs.jsx';
import Requests from '../reusableComponents/Requests.jsx';
import ClusterContainer from './ClusterContainer.jsx';

import { Kollabs } from '../../api/Kollabs.js';

export default class ClustersMain extends TrackerReact(Component) {
	constructor() {
		super();
		self = this;
		this.setConvos = this.setConvos.bind(this)
		const subscription =  Meteor.subscribe('viewConvosForUser', {
			onReady: function () {
				self.state.ready = true;
				self.setConvos();
			}
		})

		this.state = {
				subscription: subscription,
				ready: false,
				convos: 'banana'
		}
	}

	setConvos() {
		let convoData = [];
		if (Meteor.user()) {
			let confirmedConvos = Meteor.user().profile.collabs.map((convo) => {
				if (convo.set) {
					return convo.id
				} else return
			});
			confirmedConvos = confirmedConvos.filter((cf) => {return cf != undefined});
			convoData = Kollabs.find({_id : {$in: confirmedConvos }}).fetch();

			this.setState({
				convos: convoData
			})
		}
	}	

	generateClusters() {
		if (this.state.convos == 'banana') {
			return(<div className="loader">Loading...</div>)
		} else if (this.state.convos.length == 0) {
			return (
				<div className="friends_welcome">
					<h1>Welcome to your Conversations list!</h1>
					<p>This is where your conversations that you create will show.</p>
					<p>To start a new conversation, visit your <a href="/friends">friends list</a> and click start a new conversation!</p>
				</div>
			)
		} else {
			return (<ClusterContainer convos={this.state.convos} />)
		}
	}

	render() {
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

							<Requests update={this.setConvos}/>
						</div>

						<div className="main_right">
							<div className="home_feed_block box_shadow_right">
								<div className="block_header">
									<span>Conversations</span>
								</div>
								<div className="main_content">
									{ this.generateClusters() }
								</div>
							</div>
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
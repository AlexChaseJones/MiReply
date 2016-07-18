import React, { Component } from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

import TierContainer from './TierContainer'; 

import { Kollabs } from '../../api/Kollabs.js';
import { Messages } from '../../api/Messages.js';

export default class ConversationMain extends TrackerReact(Component) {
	constructor(props) {
		super(props);
		self = this;
		this.handleSubmit = this.handleSubmit.bind(this);
		this.updatePosition = this.updatePosition.bind(this);
		const subscription =  Meteor.subscribe('viewConvo', this.props.convo_Id, {
			onReady: function () {self.state.kollabReady = true; self.setInitialPosition()},
			onStop: function () {self.state.kollabReady = false}
		})
		const subscription2 = Meteor.subscribe('viewConvoMessages', this.props.convo_Id, {
			onReady: function () {self.state.messagesReady = true},
			onStop: function () {self.state.messagesReady = false}
		})
		this.state = {
			subscription: subscription,
			kollabReady: false,
			messagesReady: false,
			position: [],
			members: null
		}
	}

	handleSubmit(e) {
		e.preventDefault();
		console.log(e.target.message.value);
		let targetLocation = e.target.location.value.split(',').map(Number);

		let count = 1;
		let messages = Messages.find().fetch();
		messages.forEach((message) => {
			if (message.location.length == targetLocation.length + 1) { // filters out the messages to the length of the child
				if (JSON.stringify(message.location.slice(0,targetLocation.length) ) == JSON.stringify(targetLocation) ) { 
					
					count++;
				}
			}
		})

		if (count == 4) {
			Bert.alert('Sorry this message already has 3 replies! Add your reply a little lower.', 'danger', 'fixed-top', 'fa-frown-o');
			return;
		}
		targetLocation[targetLocation.length] = count;
		let post = {
			convoRef: this.props.convo_Id,
			message: e.target.message.value,
			location: targetLocation,
			sender: {
				id: Meteor.userId(),
				firstName: Meteor.user().profile.firstName,
				lastName: Meteor.user().profile.lastName
			},
			postedAt: Date.now()
		}
		console.log(post)
		Meteor.call('conversation_post', post, (err, data) => {
			if (err) throw err;
		})
		// Meteor.call('')
	}

	setInitialPosition() {
		if (Meteor.userId()) {
			let convo = Kollabs.find().fetch();
			userPosition = convo[0].members.reduce((member) => {
				if (member.id == Meteor.userId()) {
					return member.position
				}
			})
			this.setState({
				position: userPosition,
				members:  convo[0].members
			})
		}
	}

	updatePosition(newLocation) {
		this.setState({
			position: newLocation
		})
	}

	buildTeirs(position, members){
		let messages = Messages.find().fetch();
		if (messages.length != 0) {
			var tierMessages = {};
			for (var i=0; i<position.length + 1; i++) { // 'i' will be equal to the current tier that we are on, i.e. tier two = i = 2; i will also dictate the length of the message location array. so if i is 2 the length of the array we are looking for is two.
				tierMessages[i] = messages.filter((message) => {
					if (message.location.length == i+1) { //This will return all messages that fit the length property, but not the users position.
						if (JSON.stringify(position.slice( 0, (i) ) ) == JSON.stringify(message.location.slice(0,(i) ) ) ) { // This compares to the position state and returns correct messages.
							return message
						}
					}
				})
			}
			console.log(tierMessages)
			var tierMessages = Object.keys(tierMessages).map((key) => {return tierMessages[key]}) //Converts Object to an Array
			if (tierMessages[tierMessages.length - 1].length == 0) {//If the last active message doesnt have any chlidren remove this tier.
				tierMessages.pop();
			}
			console.log(tierMessages)
			return tierMessages.map((messages) => {
				return (<TierContainer messages={messages} members={members} position={position} tier={messages[0].location.length} handleSubmit={this.handleSubmit} updatePosition={this.updatePosition} key={messages[0]._id}/>)
			})
		}
	}

	renderMembersList(data) {
		return data.members.map((member) => {
			return (<li key={member.id}>{member.firstName} {member.lastName}</li>)
		})
	}

	render() {
		let convoData = Kollabs.find({_id: this.props.convo_Id}).fetch();
		let messagesData = Messages.find().fetch();

		if (convoData.length == 0 || !Meteor.user()) {
			return(<h1>Loading...</h1>)
		} else {

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
							<a href="/clustersPage.html"><li>
								<img className="nav_img" src="../../../images/icons/cluster.png" /> 
								<span>CLUSTERS</span>
							</li></a>
							<a href="/friends"><li>
								<img className="nav_img" src="../../../images/icons/earth.png" /> 
								<span>FRIENDS</span>
							</li></a>
							<a href={"/profile/" + Meteor.user().profile.href}><li>Alexander</li></a>
						</ul>
					</div>
				</div>
			</div>

			<div id="content">
				<div id="tierZero" className="tier">
					<div className="tierContent">
						<div className="activeBox largeBox">
							<div className="message_content">
								<div className="header_content">
									<h1>{convoData[0].name}</h1>
									<img src="/images/collab-buttons/engineer-btn.png" />
									<ul>
										{ this.renderMembersList(convoData[0]) }
									</ul>
								</div>
								<div className="new_message_container">
									<img src="../../../images/icons/close.png" />
									<form onSubmit={this.handleSubmit} className="new_message hidden">
									</form>
								</div>
								<img src="../../../images/icons/arrow-down.png" />
								<div className="msg_count">
									<img src="../../../images/icons/counter.png" />
									<img src="../../../images/icons/counter.png" />
									<img src="../../../images/icons/counter.png" />

								</div>
							</div>
						</div>
					</div>
				</div>

				{ this.buildTeirs(this.state.position, this.state.members) }
				{/*<div id="tierOne" className="tier">
					<div className="tierContent">
						<div className="activeBox smallBox">
							<div className="message_content">
								<div className="message_header memberOne">
									<h2>Alexander J.</h2>
									<h4>6/23/16<br />6:34 pm</h4>
								</div>
								<div className="clearfix"></div>
								<p>
									Hello everyone. I sent out the brochure for the Falcon 9 rocket. What do you guys think?
								</p>
								<div className="new_message_container">
									<img src="../../../images/icons/close.png" />
									<form onSubmit={this.handleSubmit.bind(this)} className="new_message hidden">
										
									</form>
								</div>
								<img src="../../../images/icons/arrow-down.png" />
								<div className="msg_count">
									<img src="../../../images/icons/counter.png" />
									<img src="../../../images/icons/counter.png" />
									<img src="../../../images/icons/counter.png" />

								</div>
							</div>
						</div>
					</div>
				</div>
				<TierContainer handleSubmit={this.handleSubmit}/>
				<div id="tierThree" className="tier">
					<div className="tierContent">
						<div className="hiddenBox"></div>
						<div className="hiddenBox"></div>
						<div className="activeBox mediumBox">
							<div className="message_content">
								<div className="message_header memberFour">
									<h2>Debra Brenan</h2>
									<h4>6/23/16<br />6:48 pm</h4>
								</div>
								<div className="clearfix"></div>
								<p>
									Falcon 9 delivers payloads to space aboard the Dragon spacecraft or inside a composite fairing. Can anyone describe the dragon spacecraft?
								</p>
								<div className="new_message_container">
									<img src="../../../images/icons/close.png" />
									<form onSubmit={this.handleSubmit.bind(this)} className="new_message hidden">
										
									</form>
								</div>
								<img src="../../../images/icons/arrow-down.png" />
								<div className="msg_count">
									<img src="../../../images/icons/counter.png" />
									<img src="../../../images/icons/counter.png" />
								</div>
							</div>
						</div>
						<div className="inactiveBox">
							<div className="message_content">
								<div className="message_header memberOne">
									<h2>Alexander J.</h2>
									<h4>6/23/16<br />6:50 pm</h4>
								</div>
								<div className="clearfix"></div>
							</div>
							<div className="hidden_message">
								<p>
									This part was really good. I wouldn't change a word in it, it's perfect.
								</p>
							</div>
							<div className="msg_count">
							</div>
						</div>
						<div className="inactiveBox">
							<div className="message_content">
								<div className="message_header memberTwo">
									<h2>Mike Railey</h2>
									<h4>6/23/16<br />7:56 pm</h4>
								</div>
								<div className="clearfix"></div>
							</div>
							<div className="hidden_message">
								<p>
									Sorry for the late reply. Like alex said this is great, although the second stage, powered by a single Merlin vacuum engine, delivers Falcon 9's payload to the desired orbit. The second stage engine ignites a few seconds after stage separation, and can be restarted multiple times to place multiple payloads into different orbits.
								</p>
							</div>
							<div className="msg_count">
									<img src="../../../images/icons/counter.png" />
							</div>
						</div>
					</div>
				</div>
				<div id="tierFour" className="tier">
					<div className="tierContent">
						<div className="hiddenBox"></div>
						<div className="hiddenBox"></div>
						<div className="activeBox largeBox">
							<div className="message_content">
								<div className="message_header memberOne">
									<h2>Alexander J.</h2>
									<h4>6/23/16<br />6:34 pm</h4>
								</div>
								<div className="clearfix"></div>
								<p>
									Dragon carries cargo in the spacecraft's pressurized capsule and unpressurized trunk, which can also accommodate secondary payloads. In the future, Dragon will carry astronauts in the pressurized capsule as well.
								</p>
								<div className="new_message_container">
									<img src="../../../images/icons/close.png" />
									<form onSubmit={this.handleSubmit.bind(this)} className="new_message hidden">
										
									</form>
								</div>
								<img src="../../../images/icons/arrow-down.png" />
								<div className="msg_count">
									<img src="../../../images/icons/counter.png" />
								</div>
							</div>
						</div>
						<div className="inactiveBox">
							<div className="message_content">
								<div className="message_header memberThree">
									<h2>Jennifer S.</h2>
									<h4>6/23/16<br />6:34 pm</h4>
								</div>
								<div className="clearfix"></div>
								</div>
								<div className="hidden_message">
									<p>
										Sorry for the late reply. Like alex said this is great, although the second stage, powered by a single Merlin vacuum engine, delivers Falcon 9's payload to the desired orbit. The second stage engine ignites a few seconds after stage separation, and can be restarted multiple times to place multiple payloads into different orbits.
									</p>
							</div>
							<div className="msg_count">
								<img src="../../../images/icons/counter.png" />
								<img src="../../../images/icons/counter.png" />
								<img src="../../../images/icons/counter.png" />
							</div>
						</div>
						<div className="hiddenBox"></div>
					</div>
				</div>*/}
			</div>
		</div>
			)
		}
	}
}
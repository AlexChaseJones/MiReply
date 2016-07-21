import React, { Component } from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

import TierContainer from './TierContainer.jsx';
import Bookmarks from './Bookmarks.jsx';
import NewMessages from './NewMessages.jsx';

import { Kollabs } from '../../api/Kollabs.js';
import { Messages } from '../../api/Messages.js';

export default class ConversationMain extends TrackerReact(Component) {
	constructor(props) {
		super(props);
		self = this;
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleFirstMessage = this.handleFirstMessage.bind(this);
		this.updatePosition = this.updatePosition.bind(this);
		this.addBookmark = this.addBookmark.bind(this);
		const subscription2 = Meteor.subscribe('viewConvoMessages', this.props.convo_Id, {
			onReady: function () {self.state.messagesReady = true; self.setMessages()},
			onStop: function () {self.state.messagesReady = false}
		})
		const subscription =  Meteor.subscribe('viewConvo', this.props.convo_Id, {
			onReady: function () {self.state.kollabReady = true; self.setInitialPosition()},
			onStop: function () {self.state.kollabReady = false}
		})
		this.state = {
			subscription: subscription,
			position: [],
			messages: 'DEFAULT',
			convo: [],
			newMessages: 'DEFAULT',
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
					if (message.sender.id == Meteor.userId()) {
						count = 4;
						return;
					}
				}
			}
		})

		if (count > 3) {
			Bert.alert('You have already replied to that message.', 'info', 'growl-top-right', 'fa-info');
			return;
		}

		let messageTarget = messages.find((message) => {
			return JSON.stringify(message.location) == JSON.stringify(targetLocation)
		})

		Meteor.call('add_child', messageTarget)

		targetLocation[targetLocation.length] = count;
		let post = {
			convoRef: this.props.convo_Id,
			children: 0,
			message: e.target.message.value,
			location: targetLocation,
			sender: {
				id: Meteor.userId(),
				firstName: Meteor.user().profile.firstName,
				lastName: Meteor.user().profile.lastName
			},
			postedAt: Date.now()
		}

		self = this;
		Meteor.call('conversation_post', post, (err, data) => {
			if (err) throw err;
			self.setState({
				messages: Messages.find().fetch(),
				position: targetLocation
			})
		})
	}

	handleFirstMessage(e) {
		e.preventDefault();
		console.log(e.target.message.value);

		let messages = Messages.find().fetch();
		for (var i = 0; i < messages.length; i++) {
			if (messages[i].location.length == 1) { 
				Bert.alert('Only one root reply allowed.', 'danger', 'fixed-top', 'fa-frown-o');
				return;
			}
		}

		let post = {
			convoRef: this.props.convo_Id,
			children: 0,
			message: e.target.message.value,
			convo: undefined,
			location: [1],
			sender: {
				id: Meteor.userId(),
				firstName: Meteor.user().profile.firstName,
				lastName: Meteor.user().profile.lastName
			},
			postedAt: Date.now()
		}

		Meteor.call('conversation_post', post, (err, data) => {
			if (err) throw err;
			self.setState({
				messages: Messages.find().fetch()
			})
		})
	}

	setInitialPosition() {
		if (Meteor.userId()) {
			debugger;
			let convo = Kollabs.find({_id: this.props.convo_Id}).fetch();
			let messages = Messages.find().fetch();
			console.log(messages)
			let user = convo[0].members.find((member) => {
				return member.id == Meteor.userId()
			})

			let newMessages = messages.filter((message) => {
				return message.postedAt > user.lastViewed && message.sender.id != Meteor.userId()
			})

			this.setState({
				position: user.position,
				members:  convo[0].members,
				convo: convo[0],
				newMessages: newMessages
			})
		}
	}

	setMessages() {
		if (Meteor.userId()) {
			this.setState({
				messages: Messages.find().fetch()
			})
		}
	}

	updatePosition(newLocation) {

		let newMessages = this.state.newMessages;
		let index = newMessages.findIndex((message) => {
			return JSON.stringify(message.location) == JSON.stringify(newLocation) 
		})

		if (index != -1) newMessages.splice(index, 1);

		this.setState({
			position: newLocation,
			newMessages: newMessages,
			messages: Messages.find().fetch()
		})
	}

	componentWillUnmount() {
		Meteor.call('update_member_info', this.state.position, this.props.convo_Id, (err, data) => {
			if (err) console.log(err)
		})
	}

	addBookmark(e) {
		debugger;
		let bookmark = $(e.target).data('value').toString().split(',').map(Number);
		for (var i = 0; i < this.state.members.length; i++) {
			if (this.state.members[i].id == Meteor.userId()) {
				for (var j = 0; j < this.state.members[i].bookmarks.length; j++) {
					if (JSON.stringify(this.state.members[i].bookmarks[j]) == JSON.stringify(bookmark)) {
						Bert.alert('You have already bookmarked this message.', 'info', 'growl-top-right', 'fa-info');
						return;
					}
				}
			}
		}
		Meteor.call('add_bookmark', bookmark, this.props.convo_Id, (err, data) => {
			if (err) console.log(err)
				Bert.alert('Bookmark added!', 'success', 'growl-top-right', 'fa-check');
		});

		let convo = Kollabs.find({_id: this.props.convo_Id}).fetch();
		this.setState({
			members: convo[0].members,
			messages: Messages.find().fetch()
		})	
	}

	buildTeirs(position, members){
		if (this.state.convo.length != 0) {
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
				var tierMessages = Object.keys(tierMessages).map((key) => {return tierMessages[key]}) //Converts Object to an Array
				if (tierMessages[tierMessages.length - 1].length == 0) {//If the last active message doesnt have any chlidren remove this tier.
					tierMessages.pop();
				}
				return tierMessages.map((messages) => {
					return (
						<TierContainer 
							messages={messages} 
							members={members} 
							position={position} 
							tier={messages[0].location.length} 
							handleSubmit={this.handleSubmit} 
							updatePosition={this.updatePosition} 
							addBookmark={this.addBookmark} 
							key={messages[0]._id}
						/>)
				})
			}
		}
	}

	bookmarks(position, members) {
		console.log('now here yo')
		if (this.state.convo.length != 0) {
			if (this.state.messages == 'DEFAULT') {
				return (<h1>Loading...</h1>)
			} else if (this.state.messages.length == 0)  {
				return(
					<Bookmarks  
							position={position}
							members={members}
							messages='none'
							updatePosition={this.updatePosition}
						/>
					)
			} else {
				let tightenedMessages = this.state.messages.map((message) => {
					return {
						id: message.sender.id,
						location: message.location,
						firstName: message.sender.firstName,
						postedAt: message.postedAt,
					}
				})
				return ( 
					<Bookmarks  
						position={position}
						members={members}
						messages={tightenedMessages}
						updatePosition={this.updatePosition}
					/>
				)
			}
		}
	}

	newMessages(newMessages) {
		if (this.state.convo.length != 0) {
			if (newMessages == 'DEFAULT') {
				return (<h1>Loading...</h1>)
			} else if (newMessages.length == 0)  {
				return (
					<NewMessages 
						messages='none'
						updatePosition={this.updatePosition}
					/>
				)
			} else {
				return (
					<NewMessages 
						messages={newMessages}
						updatePosition={this.updatePosition}
					/>
				)
			}
		}
	}

	renderMembersList(data) {
		if (this.state.convo.length != 0) {
			return data.members.map((member) => {
				return (<li key={member.id}>{member.firstName} {member.lastName}</li>)
			})
		}
	}

	render() {
		document.body.style.backgroundImage = 'url("/images/backgrounds/ice.jpg")';
		document.body.style.backgroundColor = 'black';
		if (this.state.length == 0 || !Meteor.user()) {
			return(<div className="bigLoader">Building Conversation...</div>)
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
							<a href={"/profile/" + Meteor.user().profile.href}><li>{Meteor.user().profile.firstName}</li></a>
						</ul>
					</div>
				</div>
			</div>

			<div id="content">
				<div id="tierZero" className="tier">
					<div className="tierContent">

						{ this.bookmarks(this.state.position, this.state.members ) }

						<div className="activeBox largeBox">
							<div className="message_content">
								<div className="header_content">
									<h1>{this.state.convo.name}</h1>
									<img src={"/images/collab-buttons/"+this.state.convo.image+".png"} />
									<ul>
										{ this.renderMembersList(this.state.convo) }
									</ul>
								</div>
								<div className="new_message_container">
									<img src="../../../images/icons/close.png" />
									<form onSubmit={this.handleFirstMessage} className="new_message hidden">
									</form>
								</div>
								<img src="../../../images/icons/arrow-down.png" />
								<div className="msg_count">
								</div>
							</div>
						</div>

						{ this.newMessages(this.state.newMessages) }

					</div>
				</div>

				{ this.buildTeirs(this.state.position, this.state.members) }

			</div>
		</div>
			)
		}
	}
}
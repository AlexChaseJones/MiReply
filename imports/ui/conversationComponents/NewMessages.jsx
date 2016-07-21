import React, { Component } from 'react';

export default class NewMessages extends Component {
	constructor(props) {
		super(props);
		this.renderMessages= this.renderMessages.bind(this)
	}

	renderMessages() {
		if (this.props.messages == 'none') {
			return <h3>No New Messages</h3>
		}
		let messages = this.props.messages.map((message) => {
			return (
				<li
					onClick={() => {this.props.updatePosition(message.location)} }
					key={message.location.toString()}
				>
					{message.sender.firstName}<br /> {moment((new Date(message.postedAt)).toDateString(), "ddd MMM DD YYYY").format("MMM Do")}
				</li>
			)
		})
		return( 
			<ul className="new_messages">
			{messages}
			</ul>
		)
	}

	render() {
		return (
			<div className="activeBox specialBox">
				<div className="info_content">
					<h2>New Messages</h2>
					 	{ this.renderMessages() }
				</div>
			</div>
		)
	}
}
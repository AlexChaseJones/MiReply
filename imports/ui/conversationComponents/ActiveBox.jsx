import React, { Component } from 'react';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class ActiveBox extends Component {
	constructor(props) {
		super(props);
	}

	decideSize() {
		if (this.props.message.message.length < 110) {
			return "activeBox smallBox"
		} else if (this.props.message.message.length < 150) {
			return "activeBox mediumBox"
		} else {
			return "activeBox largeBox"
		}
	}

	decideColor() {
		let index = this.props.members.map((member) => { return member.id}).indexOf(this.props.message.sender.id)
		switch(index) {
			case 0 : return "memberOne";
			case 1 : return "memberTwo";
			case 2 : return "memberThree";
			case 3 : return "memberFour";
		}
	}

	generateDots() {
		if (this.props.message.children == 0) {
			return
		} else {
			switch(this.props.message.children) {
				case 1: return "One Reply";
					break;
				case 2: return "Two Replies";
					break;
				case 3: return "Three Replies";
					break;
			}
		}
	}

	generateName() {
		if (this.props.message.sender.firstName.length + this.props.message.sender.lastName.length > 11) {
			return this.props.message.sender.firstName + ' ' + this.props.message.sender.lastName[0] + '.';
		} else if (this.props.message.sender.firstName.length > 13) {
			return this.props.message.sender.firstName.substring(0,10) + '...'
		} else return this.props.message.sender.firstName + ' ' + this.props.message.sender.lastName
		
	}

	render() {
		return (
			<ReactCSSTransitionGroup
				component="span"
				transitionName="activeBoxLoad"
				transitionEnterTimeout={600}
				transitionAppearTimeout={600}
				transitionLeaveTimeout={400}
				transitionAppear={true}
			>
				<div className={this.decideSize() + ' ' + this.decideColor()} onClick={() => {this.props.updatePosition(this.props.message.location)} } >
					<div className="message_content">
						<div className="message_header">
							<h2>{this.generateName()}</h2>
							<h4>{moment((new Date(this.props.message.postedAt)).toDateString(), "ddd MMM DD YYYY").format("MMM, Do")}<br />{moment((new Date(this.props.message.postedAt))).format("h:mm a")}</h4>
						</div>
						<div className="clearfix"></div>
						<p>
							{this.props.message.message}
						</p>
						<div className="new_message_container">
							<h2>Reply</h2>
							<form onSubmit={this.props.handleSubmit} className="new_message hidden">
								<input type="hidden" value={this.props.message.location} name="location"/>
								<div onClick={this.props.addBookmark} data-value={this.props.message.location} className="bookmark" name={this.props.message.sender.id}></div>
							</form>
						</div>
						<div className="msg_count">
							{this.generateDots()}
						</div>
					</div>	
				</div>
			</ReactCSSTransitionGroup>
		)
	}
}
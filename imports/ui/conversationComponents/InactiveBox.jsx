import React, { Component } from 'react';

export default class InactiveBox extends Component {
	constructor(props) {
		super(props);
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

	render() {
		return (
			<div className={"inactiveBox " + this.decideColor()} onClick={() => {this.props.updatePosition(this.props.message.location)} }>
				<div className="message_content">
					<div className="message_header">
						<h2>{this.props.message.sender.firstName} {this.props.message.sender.lastName}</h2>
						<h4>{moment((new Date(this.props.message.postedAt)).toDateString(), "ddd MMM DD YYYY").format("MMM, Do")} {moment((new Date(this.props.message.postedAt))).format("h:mm a")}</h4>
					</div>
					<div className="clearfix"></div>
				</div>
				<div className="hidden_message">
					<p>
						{this.props.message.message}
					</p>
				</div>
				<div className="msg_count">
					{this.generateDots()}
				</div>
			</div>
		)
	}
}
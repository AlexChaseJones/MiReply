import React, { Component } from 'react';

export default class InactiveBox extends Component {
	constructor(props) {
		super(props);
	}

	decideColor() {
		let index = this.props.members.map((member) => { return member.id}).indexOf(this.props.message.sender.id)
		switch(index) {
			case 0 : return "message_header memberOne";
			case 1 : return "message_header memberTwo";
			case 2 : return "message_header memberThree";
			case 3 : return "message_header memberFour";
		}
	}

	generateDots() {
		let dots = [];
		for (var i = 0; i<this.props.message.children; i++) {
			dots.push(<img src="/images/icons/counter.png" key={i+5}/>)
		}
		return dots;
	}

	render() {
		return (
			<div className="inactiveBox" onClick={() => {this.props.updatePosition(this.props.message.location)} }>
				<div className="message_content">
					<div className={this.decideColor()}>
						<h2>{this.props.message.sender.firstName} {this.props.message.sender.lastName}</h2>
						<h4>{moment((new Date(this.props.message.postedAt)).toDateString(), "ddd MMM DD YYYY").format("MM/DD/YY")}<br />{moment((new Date(this.props.message.postedAt))).format("h:mm a")}</h4>
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
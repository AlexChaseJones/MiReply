import React, { Component } from 'react';

export default class ConvoRequestDetail extends Component {
	constructor() {
		super();
		this.confimConvo = this.confimConvo.bind(this)
		this.handleHref = this.handleHref.bind(this)
	}

	handleHref() {
		window.location = '/profile/'+this.props.user._id
	}

	confimConvo() {
		Meteor.call('confirm_convo_request', this.props.convo._id,  (err, data) => {
			if (err) console.log(err)
			this.props.updateConvos();
		})
	}

	showMembers() {
		if (this.props.convo.members.length == 1) {
			return (this.props.convo.members[0].firstName + this.props.convo.members[0].lastName)
		} else {
			let members = this.props.convo.members.map((member) => {
				return ' ' + member.firstName + ' ' + member.lastName;
			})
			members = members.toString()

			let ax = members.lastIndexOf(',');
			if (ax != -1) {
				if (this.props.convo.members.length ==2) oxford = ' and ';
				else oxford = ', and '
				members = members.substring(0,ax) + oxford + members.substring(ax+1);
			}
			return members;
		}
	}

	showMessage() {
		if (this.props.convo.members.length ==1) {
			return "wants you to join their convo"
		} else {
			return "want you to join their convo"
		}
	}

	render() {
		return (
			<div className="request">
				<p>
					{this.showMembers() } { this.showMessage() } <span>{this.props.convo.name}</span>
				</p>
				<img onClick={this.confimConvo} src="/images/icons/add-cluster.png" />
				<img src="/images/icons/remove.png" />
			</div>
		)
	}
}
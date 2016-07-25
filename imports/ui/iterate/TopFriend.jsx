import React, { Component } from 'react';

export default class TopFriend extends Component {
	constructor() {
		super();
	}
	
	getUserImage() {
	}

	getUserName() {
	}

	render() {
		return (
			<a href={"/profile/" + this.props.user.profile.href}><li>
				<img src={ this.props.user.profile.image } />
				<br />
				<span>{ this.props.user.profile.firstName}</span>
			</li></a>
		)
	}
}
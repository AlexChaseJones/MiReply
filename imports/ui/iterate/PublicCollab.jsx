import React, { Component } from 'react';

export default class PublicCollab extends Component {
	constructor() {
		super();
	}
	
	render() {
		return (
			<li>
				<img src={this.props.collab.image} />
				<br />
				<span>{this.props.collab.name}</span>
			</li>
		)
	}
}
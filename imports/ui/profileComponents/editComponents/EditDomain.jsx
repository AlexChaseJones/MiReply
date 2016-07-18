import React, { Component } from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class EditDomain extends TrackerReact(Component) {
	constructor(props) {
		super(props);
		this.updateDomain = this.updateDomain.bind(this);
		this.editValue = this.editValue.bind(this);
		this.state = {
			domain: this.props.user.profile.href
		}
	}

	editValue(e) {
		let nextState = {};
		nextState[e.target.name] = e.target.value;
		this.setState(nextState)
	}

	updateDomain(e) {
		e.preventDefault();
		$('#href_updater').prop('disabled', true);
		let domain = this.refs.domain.value.trim()
		Meteor.call('update_domain', this.state.domain, (err, data) => {
			if (err) console.log(err)
			else if (!err) Bert.alert('Domain href updated!', 'info', 'growl-bottom-right', 'fa-check');
			setTimeout(function(){
				$('#href_updater').prop('disabled', false);
			}, 1000);
		})
	}
	
	render() {
		return (
			<div className="domain">
				<h3>Personal Domain</h3>
				<form onSubmit={this.updateDomain}>
					<label htmlFor="domain">www.proversate.com/profile/</label>
					<input type="text" name="domain" ref="domain" value={this.state.domain} onChange={this.editValue}/>
					<button type="submit" id="href_updater">Update</button>
				</form>
			</div>
		)
	}
}




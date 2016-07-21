import React, { Component } from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

import ConvoCard from '../iterate/ConvoCard.jsx';

export default class ClusterContainer extends TrackerReact(Component) {
	constructor(props) {
		super(props);
		this.state = {
			allConvos: this.props.convos,
			filteredConvos: []
		}
	}

	componentWillMount() {
		console.log(this.props.convos)
		let convos = this.props.convos.map((convo) => {
			return (<ConvoCard convo={convo} key={convo._id} />)
		})
		console.log(convos)
		if (convos.length == 0) {
			let convos = [];
			convos.push(<h1 key='1'>No convos</h1>)
		}
		this.setState({
			filteredConvos: convos
		})
	}

	componentWillReceiveProps() {
		let convos = this.props.convos.map((convo) => {
			return (<ConvoCard convo={convo} key={convo._id} />)
		})
		console.log(convos)
		if (convos.length == 0) {
			let convos = [];
			convos.push(<h1 key='1'>No convos</h1>)
		}
		this.setState({
			filteredConvos: convos
		})
	}

	shouldComponentUpdate() {
		return true
	}

	filterConvos() {
		// console.log(this.refs.filter_convos.value)
		// let convos = this.props.convos.map((convo) => {
		// 	if (fullName.toLowerCase().indexOf(this.refs.filter_convos.value.toLowerCase()) >= 0 ) { //This checks for the input in the name of convos and returns the convo if true
		// 		return (<ConvoCard user={convo} key={convo._id} />)
		// 	}
		// })
		// if (convos.length == 0) {
		// 	let convos = [];
		// 	convos.push(<h1 key='1'>No convos</h1>)
		// }
		// console.log(convos)
		// this.setState({
		// 	filteredConvos: convos
		// })
	}



	render() {
		Meteor.users.find();
		return (
			<div>
				<div className="cluster_header">
					<form id="filter_clusters_form">
						<input type="text" name="filter_convos" ref="filter_convos" onInput={ this.filterConvos.bind(this) } placeholder="Filter convos..." />
					</form>
					<a href="/create/convo"><button type="submit">New Cluster</button></a>
					<div className="clearfix"></div>
				</div>
				{ this.state.filteredConvos }
			</div>

		)
	}
}
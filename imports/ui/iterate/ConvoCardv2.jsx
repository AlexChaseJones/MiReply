import React, { Component } from 'react';

export default class ConvoCardv2 extends Component {
	constructor() {
		super();
		this.handleHref = this.handleHref.bind(this);
	}


	handleHref() {
		window.location = '/conversation/view/'+this.props.convo._id
	}

	showMembers() {
		return this.props.convo.members.map((member) => {
			return (<li key={member.id}>{member.firstName + ' ' + member.lastName}</li>)
		})
	}

	showMessages() {
		//in the works
	}

	render() {
		return (
			<div className="cluster_card_3d_container">
				<div className="cluster_card">
					<figure onClick={this.handleHref} className={"front " + this.props.color}>
						<div className="contained">
							<h3 onClick={this.handleHref} >{this.props.convo.name}</h3>
							<ul>
								{ this.showMembers() }
							</ul>
							<div className="clearfix"></div>
							<div className="card_footer">		
								<h4>{this.showMessages() }</h4>
								<img className="flip_icon_cluster" src={"/images/collab-buttons-v2/"+this.props.convo.image +".png"} />
							</div>
						</div>
					</figure>
					<figure onClick={this.handleHref} className="back">
						<div className="contained">
							<h2>View Conversation</h2>
						</div>
					</figure>		
				</div>
			</div>
		)
	}
}




import React, { Component } from 'react';

export default class ConvoCard extends Component {
	constructor() {
		super();
		this.handleHref = this.handleHref.bind(this);
	}


	handleHref() {
		window.location = '/conversation/view/'+this.props.convo._id
	}

	showMembers() {
		return this.props.convo.members.map((member) => {
			return (<li>{member.firstName + ' ' + member.lastName}</li>)
		})
	}

	render() {
		return (
			<div className="cluster_card_3d_container">
				<div className="cluster_card">
					<figure className="front">
						<div className="contained">
							<img onClick={this.handleHref} src={"/images/collab-buttons/"+this.props.convo.image +".png"} />
							<h3 onClick={this.handleHref} >{this.props.convo.name}</h3>
							<ul>
								{ this.showMembers() }
							</ul>
							<div className="clearfix"></div>
							<h4>0 unread messages</h4>
							<img className="flip_icon_cluster" src="../../../images/icons/flipper.png" />
						</div>
					</figure>
					<figure className="back">
						<div className="contained">
							<div>
								<img src="../../../images/icons/editor.png" />
								<h3>Edit Cluster</h3>
							</div>
							<span>
								<img src="../../../images/icons/close.png" />
								<h4>Leave</h4>
							</span>
							<img className="flip_icon_close" src="../../../images/icons/flipper.png" />
						</div>
					</figure>		
				</div>
			</div>
		)
	}
}




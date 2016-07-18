import React, { Component } from 'react';

export default class RecentKollabs extends Component {
	constructor() {
		super();
	}

	render() {
		return (
			<div className="aside_block box_shadow_left">
				<div className="block_header">
					<span>Recent Clusters</span>
				</div>
				<div className="rc_content">

					<div className="recent_cluster">
						<img src="../../../images/collab-buttons/billing-btn.png" />
						<br /> 
						<span>Billing</span>
					</div>
					<div className="recent_cluster">
						<img src="../../../images/collab-buttons/engineer-btn.png" />
						<br /> 
						<span>Engineers</span>
					</div>
					<div className="recent_cluster">
						<img src="../../../images/collab-buttons/billing-btn.png" />
						<br /> 
						<span>Matthew H.</span>
					</div>
					<div className="recent_cluster">
						<img src="../../../images/collab-buttons/meteor-btn.png" />
						<br /> 
						<span>Meteor Devs</span>
					</div>
					<div className="recent_cluster">
						<img src="../../../images/collab-buttons/engineer-btn.png" />
						<br /> 
						<span>James R.</span>
					</div>
					<div className="recent_cluster">
						<img src="../../../images/collab-buttons/ghost-btn.png" />
						<br /> 
						<span>Office Buds</span>
					</div>

				</div>
			</div>
		)
	}
}
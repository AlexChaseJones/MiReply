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
						<img src="../../../images/collab-buttons/14.png" />
						<br /> 
						<span>Billing</span>
					</div>
					<div className="recent_cluster">
						<img src="../../../images/collab-buttons/34.png" />
						<br /> 
						<span>Engineers</span>
					</div>
					<div className="recent_cluster">
						<img src="../../../images/collab-buttons/25.png" />
						<br /> 
						<span>Matthew H.</span>
					</div>
					<div className="recent_cluster">
						<img src="../../../images/collab-buttons/41.png" />
						<br /> 
						<span>Meteor Devs</span>
					</div>
					<div className="recent_cluster">
						<img src="../../../images/collab-buttons/17.png" />
						<br /> 
						<span>James R.</span>
					</div>
					<div className="recent_cluster">
						<img src="../../../images/collab-buttons/28.png" />
						<br /> 
						<span>Office Buds</span>
					</div>

				</div>
			</div>
		)
	}
}
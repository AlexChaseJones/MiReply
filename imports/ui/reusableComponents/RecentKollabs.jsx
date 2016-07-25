import React, { Component } from 'react';

export default class RecentKollabs extends Component {
	constructor() {
		super();
	}

	render() {
		return (
			<div className="aside_block box_shadow_left">
				<div className="block_header">
					<p>Recent Convos</p>
				</div>
				<div className="rc_content">

					<div className="recent_cluster color-3">
						<img src="../../../images/collab-buttons-v2/14.png" />
						<br /> 
						<p>Billing</p>
					</div>
					<div className="recent_cluster color-6">
						<img src="../../../images/collab-buttons-v2/34.png" />
						<br /> 
						<p>Engineers</p>
					</div>
					<div className="recent_cluster color-5">
						<img src="../../../images/collab-buttons-v2/25.png" />
						<br /> 
						<p>Matthew H.</p>
					</div>
					<div className="recent_cluster color-1">
						<img src="../../../images/collab-buttons-v2/41.png" />
						<br /> 
						<p>Meteor Devs</p>
					</div>
					<div className="recent_cluster color-2">
						<img src="../../../images/collab-buttons-v2/17.png" />
						<br /> 
						<p>James R.</p>
					</div>
					<div className="recent_cluster color-4">
						<img src="../../../images/collab-buttons-v2/28.png" />
						<br /> 
						<p>Office Buds</p>
					</div>

				</div>
			</div>
		)
	}
}
import React, { Component } from 'react';

import TopFriend from '../iterate/TopFriend.jsx';
import PublicCollab from '../iterate/PublicCollab.jsx';

export default class ProfileAside extends Component {
	constructor() {
		super();
	}

	renderFriends() {
		topFriends = [];
			this.props.user.profile.topFriends.forEach((topFriend) => {
			let friend = Meteor.users.findOne(topFriend.id);
			if (friend) {
				topFriends.push(<TopFriend user={friend} key={friend._id} />)
			}
		})

		if (topFriends.length == 0) {
			topFriends.push(<li key='1'> No top Friends! </li>)
		}
		return topFriends;
	}

	renderCollabs() {
		publicCollabs = this.props.user.profile.collabs.filter(collab => collab.public);

		if (publicCollabs.length == 0) {
			return (<li key='1'> No Public Collabs! </li>)
		}

		return publicCollabs.map((collab) => {
			return (<PublicCollab collab={collab} key={collab.id} />)
		})
	}

	render() {
		return (
			<div className="aside_block box_shadow_right">
				<div className="block_header_sm"></div>
				<div className="insight_content">
					<h2>Insight</h2>
					<div className="line_seperator"></div>

					<div className="insight_section">
						<img src="/images/icons/summary.png" />
						<h3>Summary</h3>
						<p>
							{this.props.user.profile.summary}
						</p>
						<div className="line_seperator"></div>
					</div>

					<div className="insight_section">
						<img src="/images/icons/public-clusters.png" />
						<h3>Public Clusters</h3>
						<ul className="public_clusters">
							{ this.renderCollabs() }	
						</ul>
						<div className="line_seperator"></div>
					</div>

					<div className="insight_section">
						<img src="/images/icons/top-friends.png" />
						<h3>Top Friends</h3>
						<ul className="top_friends">
							{ this.renderFriends() }
						</ul>
						<div className="line_seperator"></div>
					</div>

				</div>
			</div>
		)
	}
}
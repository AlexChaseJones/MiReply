import React, { Component } from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import EditPhoto from './EditPhoto.jsx';
import EditInfo from './EditInfo.jsx';
import EditSocial from './EditSocial.jsx';
import EditDomain from './EditDomain.jsx';

export default class EditProfile extends TrackerReact(Component) {
	constructor() {
		super();
		this.state = {}
	}

	render() {
		let userData = Meteor.users.find({_id: Meteor.userId()}).fetch();
		if (userData.length == 0 || !Meteor.user()) {
			return(<h1>Loading...</h1>)
		} else {
			console.log(userData[0])
			return (
				<div>
					<div className="header">
						<div className="container">
							<div className="logo">
								<img className="nav_img_md" src="/images/icons/cluster.png" />		
								<span>Cluster</span>
							</div>
							<div className="nav">
								<ul>
									<a href="/homePage.html"><li>
										<img className="nav_img" src="/images/icons/earth.png" /> 
										<span>HOME</span>
									</li></a>
									<a href="/clustersPage.html"><li>
										<img className="nav_img" src="/images/icons/cluster.png" /> 
										<span>CONVERSATIONS</span>
									</li></a>
									<a href="/friends"><li>
										<img className="nav_img" src="/images/icons/earth.png" /> 
										<span>FRIENDS</span>
									</li></a>
									<a href={"/profile/" + Meteor.user().profile.href}><li>{Meteor.user().profile.firstName}</li></a>
								</ul>
							</div>
						</div>
					</div>
					<div id="stella">
						<div className="container">
							<div className="edit_profile_block">
								<div className="box_shadow_right"><div className="block_header_sm"></div>
									<h1>Edit Profile</h1>
									<div className="line_seperator_md"></div>
									<EditPhoto user={userData[0]} />
									<EditInfo user={userData[0]} />
									<EditSocial user={userData[0]} />
									<EditDomain user={userData[0]} />
									<div className="clearfix"></div>
								</div>
							</div>
						</div>
					</div>
				</div>
			)
		}
	}
}
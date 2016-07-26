import React, { Component } from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class CreateCluster extends TrackerReact(Component) {
	constructor(props) {
		super(props);
		self = this;
		this.handleSubmit = this.handleSubmit.bind(this)
		const subscription =  Meteor.subscribe('viewFriends', {
			onReady: function () {
				self.state.ready = true;
			}
		})
		this.state = {
				subscription: subscription,
				ready: false,
				user: this.props.userId
		}
	}

	queryUser() {
		return this.props.user;
		return "banana"
	}

	renderOptions(friends) {
		return friends.map((friend) => {
			return (<option data-value={friend._id} value={friend.profile.firstName + ' ' + friend.profile.lastName} key={friend._id}></option>)
		})
	}

	handleSubmit(e) {
		debugger;
		e.preventDefault();
		var data = {};
		$("#friends option").each(function(i,el) {  
		   data[$(el).data("value")] = $(el).val();
		});
        var memberOne = this.refs.memberOne.value;

        console.log(memberOne == this.props.user)

        if (memberOne == this.props.user) {
        	memberOne = this.props.Id;
        }else {
        	memberOne = (_.invert(data)[memberOne])
        }

        var memberTwo = this.refs.memberTwo.value;
        memberTwo = ($('#friends [value="' + memberTwo + '"]').data('value'));

        var memberThree = this.refs.memberThree.value;
        memberThree = ($('#friends [value="' + memberThree + '"]').data('value'));
        //Simple condition checks.

        if (!memberTwo && !memberThree) { //This protects from two empty inputs from matching.
        	if (memberOne == memberTwo || memberOne == memberThree) {
        		Bert.alert('Looks like you put the same friend twice, try again.', 'danger', 'fixed-top', 'fa-frown-o');
        		return;
        	}
        } else if (memberOne == memberTwo || memberOne == memberThree || memberTwo == memberThree) {
        	Bert.alert('Looks like you put the same friend twice, try again.', 'danger', 'fixed-top', 'fa-frown-o');
        		return;
        } else if (!memberTwo && memberThree) {
        	Bert.alert('Please dont skip Member Two', 'danger', 'fixed-top', 'fa-frown-o');
        }
        // FUTURE: PUT A CHECK IN HERE TO MAKE SURE THE INPUTED MEMBER EXISTS IN THE FRIENDS ARRAY. no time right now. must move forward.
        // Build Kollab object
        let cluster = {
			"name": this.refs.kollabName.value.trim().toLowerCase(),
			"public": false,
			"image": e.target.icon.value,
			"members": [
				{
					id: Meteor.userId(),
					firstName: Meteor.user().profile.firstName,
					lastName: Meteor.user().profile.lastName,
					position: [1],
					bookmarks: []
				},
				{
					id: memberOne,
					firstName: this.refs.memberOne.value.split(' ')[0],
					lastName: this.refs.memberOne.value.split(' ')[1],
					position: [1],
					bookmarks: []
				}
			],
			"lastMessage": new Date()
		}

		let memberIds = [memberOne]
        if (memberTwo) {
        	cluster.members.push(
        		{
        			id:memberTwo,
        			firstName:this.refs.memberTwo.value.split(' ')[0],
        			lastName:this.refs.memberTwo.value.split(' ')[1],
        			position: [1],
        			bookmarks: []
        		}
        	)
        	memberIds.push(memberTwo)
        }
        if (memberThree) {
        	cluster.members.push(
        		{
        			id:memberThree,
        			firstName:this.refs.memberThree.value.split(' ')[0],
        			lastName:this.refs.memberThree.value.split(' ')[1],
        			position: [1],
        			bookmarks: []
        		}
        	)
        	memberIds.push(memberThree)
        }

        Meteor.call('create_cluster', cluster, (err, data) => {

			if (err) console.log(err)
			else if (!err) {
				clusterId = data;
				Meteor.call('add_user_cluster', data, memberIds, (err, data2) => {

					if (err) console.log(err)
						FlowRouter.go("/conversation/view/" + data);
				})
			}
		})
	}

	getFriendsData() {
		if (Meteor.user()) {
			let confirmedFriends = Meteor.user().profile.friends.map((friend) => {
				if (friend.set) {
					return friend.id
				} else return
			});
			confirmedFriends = confirmedFriends.filter((cf) => {return cf != undefined})
			console.log(confirmedFriends)
			if (confirmedFriends.length == 0) {
				return (['no friends'])
			}
			return Meteor.users.find({_id : {$in: confirmedFriends}}).fetch();
		}
	}

	showIcons() {
		let icons = []
		for (var i=1; i<=100; i++) {
			icons.push(
				<li>
				    <label>
				        <input type="radio" name="icon" value={i} required/>
				        <img src={"/images/collab-buttons-v2/"+i+".png"} />
				    </label>
				</li>
			)
		}
		return icons;
	}

	render() {
		document.body.style.backgroundColor = 'rgb(246,240,235)';
		if (!Meteor.user()) {
			return(<h1>Loading...</h1>)
		} else {
		let friendsData;
		let confirmedFriends = Meteor.user().profile.friends.map((friend) => {
			if (friend.set) {
				return friend.id
			} else return
		});
		confirmedFriends = confirmedFriends.filter((cf) => {return cf != undefined})
		console.log(confirmedFriends)
		if (confirmedFriends.length == 0) {
			return (['no friends'])
		}
		friendsData = Meteor.users.find({_id : {$in: confirmedFriends}}).fetch();

		if (friendsData.length == 0) {
			return(<h1>Loading...</h1>)
		} else {
			console.log(friendsData)
			return (
			<div>
				<div className="header">
					<div className="container">
						<div className="logo">
							<img className="nav_img_md" src="../../../images/icons/cluster.png" />		
							<span>Cluster</span>
						</div>
						<div className="nav">
							<ul>
								<a href="/homePage.html"><li>
									<img className="nav_img" src="../../../images/icons/earth.png" /> 
									<span>HOME</span>
								</li></a>
								<a href="/convos"><li>
									<img className="nav_img" src="../../../images/icons/cluster.png" /> 
									<span>CONVERSATIONS</span>
								</li></a>
								<a href="/friends"><li>
									<img className="nav_img" src="../../../images/icons/earth.png" /> 
									<span>FRIENDS</span>
								</li></a>
								<a href={"/profile/" + Meteor.user().profile.href}><li>{Meteor.user().profile.firstName}</li></a>
							</ul>
						</div>
					</div>
				</div>
				<div id="stella">
					<div className="container">
						<div className="main_center new_cluster_block">
							<div className="center_block box_shadow_right">
								<div className="block_header">
									<h2>New Conversation</h2>
								</div>
								<div className="line_seperator_md"></div>
								<form id="new_cluster" onSubmit={this.handleSubmit}>
									<label htmlFor="kollabName">Title</label>
									<input type="text" name="kollabName" ref="kollabName" pattern=".{3,15}" required title="3 to 15 characters"/><br />
									<label htmlFor="memberOne">Members</label>
									<input type="text" className="memberOne" className="memberOne" ref="memberOne" list="friends" required placeholder="One member required" defaultValue={this.queryUser()} /><br />
									<input type="text" className="memberTwo" className="memberTwo" ref="memberTwo" list="friends"/><br />
									<input type="text" className="memberThree" className="memberThree" ref="memberThree" list="friends"/><br />
									<div className="clearfix"></div>
									<div className="line_seperator_md"></div>
									<div className="icons">
										<h2>Choose an Icon for your Conversation! (required)</h2>
										<ul>
										    { this.showIcons() }
										</ul>
										<button type="submit">Create</button>
									</div>
								</form>
							</div>
						</div>		
					</div>
				</div>
				<datalist id="friends">
					{ this.renderOptions(friendsData) }
				</datalist>
			</div>
			)
		}
	}
	}
}
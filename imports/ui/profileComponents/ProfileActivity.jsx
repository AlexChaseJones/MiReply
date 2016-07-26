import React, { Component } from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

import ActivityPost from '../iterate/ActivityPost.jsx';

export default class ProfileActivity extends TrackerReact(Component) {
	constructor() {
		super();
		this.handlePost = this.handlePost.bind(this)
	}

	handlePost(e) {
		e.preventDefault();
		console.log(this.refs.newPost.value);
		let post = {
			post: this.refs.newPost.value.trim(),
			posterId: Meteor.userId(),
			postedAt: new Date()
		}
		Meteor.call('insert_post', post, (err, data) => {
			if (err) console.log(err)
			else console.log(data)
		})
	}

	showForm() {
		if (Meteor.userId() == this.props.user._id) {
			return (
				<form onSubmit={ this.handlePost } id="new_post">
					<input type="text" name="newPost" ref="newPost" />
					<button type="submit">Post</button>
				</form>
			)
		}
	}

	showPosts() {
		let posts = this.props.posts.map((post) => {
			return (<ActivityPost user={this.props.user} post={post} key={post._id} />)
		})

		if (posts.length == 0 && Meteor.userId() == this.props.user._id) {
			return (
				<div className="friends_welcome">
					<h1>You haven't posted anything on your board!</h1>
					<p>Your board is viewable by anyone that visits your profile.</p>
					<p>Boards hold up to ten messages, when you reach your eleventh post, the last board message will be removed and deleted forever. (and ever).</p>
				</div>
			)
		} else if (posts.length == 0 && Meteor.userId() != this.props.user._id) {
			return (
				<div className="friends_welcome">
					<h1>This user hasn't posted anything yet.</h1>
				</div>
			)
		} else return posts.reverse().slice(0,10);
	}

	render() {
		return (
			<div className="home_feed_block box_shadow_left">
				<div className="block_header_sm"></div>
				<div className="main_content">
					{ this.showForm() }
					{ this.showPosts() }
				</div>
			</div>
		)
	}
}
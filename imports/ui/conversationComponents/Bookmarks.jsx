import React, { Component } from 'react';

export default class Bookmarks extends Component {
	constructor(props) {
		super(props);
		this.renderBookmarks = this.renderBookmarks.bind(this)
	}

	renderBookmarks() {
		debugger;
		if (this.props.messages == 'none') {
			return <h4>No Saved Bookmarks</h4>
		}
		let user = this.props.members.find((member) => {
			return (member.id == Meteor.userId()) 
		})
		let bookmarks = user.bookmarks.map((location) => {
			return this.props.messages.find((message) => {
				return (JSON.stringify(message.location) == JSON.stringify(location)) 
			})
		})
		if (bookmarks[0] != undefined) {
			bookmarks = bookmarks.map((bookmark) => {
				return (
					<li 
						className={this.decideColor(bookmark)}
						onClick={() => {this.props.updatePosition(bookmark.location)} }
						key={bookmark.location.toString()}
					>
						{bookmark.firstName}<br /> {moment((new Date(bookmark.postedAt)).toDateString(), "ddd MMM DD YYYY").format("MMM Do")}
					</li>
				)
			})

			return (
				<div>
					{bookmarks}
				</div>
			)
		} else {
			return <h3>No Saved Bookmarks</h3>
		}
	}

	decideColor(bookmark) {
		let index = this.props.members.map((member) => { return member.id}).indexOf(bookmark.id)
		switch(index) {
			case 0 : classes = "memberOne bookmark";
					 break;
			case 1 : classes = "memberTwo bookmark";
					 break;
			case 2 : classes = "memberThree bookmark";
					 break;
			case 3 : classes = "memberFour bookmark";
					 break;
		}
		if (JSON.stringify(bookmark.location) == JSON.stringify(this.props.position)) {
			classes += " activeBookmark"
		}
		return classes
	}

	render() {
		return (
			<ul className="bookmarks">
				{ this.renderBookmarks() }
			</ul>
		)
	}
}
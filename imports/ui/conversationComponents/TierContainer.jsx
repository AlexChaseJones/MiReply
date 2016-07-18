import React, { Component } from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

import HiddenBox from './HiddenBox.jsx';
import InactiveBox from './InactiveBox.jsx';
import ActiveBox from './ActiveBox.jsx';

export default class TierContainer extends Component {
	constructor(props) {
		super(props);
	}

	generateMessages(messages) {
		let activeMessagePosition = this.props.position[this.props.tier - 1] //active message location based off position for the current tier.

 		if (activeMessagePosition == 1) {
 			if (messages.length == 1) {
 				return (
 					<div>
	 					<HiddenBox />
	 					<HiddenBox />
	 					<ActiveBox members={this.props.members} message={messages[0]} handleSubmit={this.props.handleSubmit}/>
	 					<HiddenBox />
	 					<HiddenBox />
 					</div>	
 				)
 			}
 			else if (messages.length == 2 ) {
 				return (
 					<div>
		 				<HiddenBox />
		 				<HiddenBox />
		 				<ActiveBox members={this.props.members} message={messages[0]} handleSubmit={this.props.handleSubmit}/>
		 				<InactiveBox members={this.props.members} message={messages[1]} updatePosition={this.props.updatePosition}/>
		 				<HiddenBox />
	 				</div>
 				)
 			} else {
	 			return (
	 				<div>
		 				<HiddenBox />
		 				<HiddenBox />
		 				<ActiveBox members={this.props.members}  message={messages[0]} handleSubmit={this.props.handleSubmit}/>
		 				<InactiveBox members={this.props.members} message={messages[1]} updatePosition={this.props.updatePosition}/>
		 				<InactiveBox members={this.props.members} message={messages[2]} updatePosition={this.props.updatePosition}/>
	 				</div>
	 			)
	 		}
 		} else if (activeMessagePosition == 2) {
 			
 			if (messages.length == 2 ) {
 				return (
 					<div>
		 				<HiddenBox />
		 				<InactiveBox members={this.props.members} message={messages[0]} updatePosition={this.props.updatePosition}/>
		 				<ActiveBox members={this.props.members}  message={messages[1]} handleSubmit={this.props.handleSubmit}/>
		 				<HiddenBox />
		 				<HiddenBox />
	 				</div>
 				)
 			} else {
	 			return (
	 				<div>
		 				<HiddenBox />
		 				<InactiveBox members={this.props.members} message={messages[0]} updatePosition={this.props.updatePosition}/>
		 				<ActiveBox members={this.props.members} message={messages[1]} handleSubmit={this.props.handleSubmit}/>
		 				<InactiveBox members={this.props.members} message={messages[2]}updatePosition={this.props.updatePosition}/>
		 				<HiddenBox />
	 				</div>
	 			)
	 		}
 		} else if (activeMessagePosition == 3) {
 			return (
 				<div>
	 				<InactiveBox members={this.props.members} message={messages[0]} updatePosition={this.props.updatePosition}/>
	 				<InactiveBox members={this.props.members} message={messages[1]} updatePosition={this.props.updatePosition}/>
	 				<ActiveBox members={this.props.members} message={messages[2]} handleSubmit={this.props.handleSubmit}/>
	 				<HiddenBox />
	 				<HiddenBox />
 				</div>
 			)
 		} else if (!activeMessagePosition) {
 			if (messages.length == 1) {
 				return (
 					<div>
	 					<HiddenBox />
	 					<HiddenBox />
	 					<InactiveBox members={this.props.members} message={messages[0]} updatePosition={this.props.updatePosition}/>
	 					<HiddenBox />
	 					<HiddenBox />
 					</div>	
 				)
 			}
 			else if (messages.length == 2 ) {
 				return (
 					<div>
		 				<HiddenBox />
		 				<InactiveBox members={this.props.members} message={messages[0]} updatePosition={this.props.updatePosition}/>
		 				<InactiveBox members={this.props.members} message={messages[1]} updatePosition={this.props.updatePosition}/>
		 				<HiddenBox />
	 				</div>
 				)
 			} else {
	 			return (
	 				<div>
		 				<HiddenBox />
		 				<InactiveBox members={this.props.members}  message={messages[0]} updatePosition={this.props.updatePosition}/>
		 				<InactiveBox members={this.props.members} message={messages[1]} updatePosition={this.props.updatePosition}/>
		 				<InactiveBox members={this.props.members} message={messages[2]} updatePosition={this.props.updatePosition}/>
		 				<HiddenBox />
	 				</div>
	 			)
	 		}
 		}
	}



	render() {
		return (
			<div id="tierTwo" className="tier">
				<div className="tierContent">
					{this.generateMessages(this.props.messages)}
					
					
				</div>
			</div>
		)
	}
}
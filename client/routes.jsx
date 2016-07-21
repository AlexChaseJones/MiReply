import React from 'react';
import { mount } from 'react-mounter';
import { Meteor } from 'meteor/meteor';

import LandingPage from '../imports/ui/LandingPage.jsx';
import { MainLayout } from '../imports/ui/layouts/MainLayout.jsx';
import ProfileMain from '../imports/ui/profileComponents/ProfileMain.jsx';
import FriendsMain from '../imports/ui/friendsComponents/FriendsMain.jsx';
import ConversationMain from '../imports/ui/conversationComponents/ConversationMain.jsx';
import CreateCluster from '../imports/ui/clusterComponents/CreateCluster.jsx';
import ClustersMain from '../imports/ui/clusterComponents/ClustersMain.jsx';
import EditProfileMain from '../imports/ui/profileComponents/editComponents/EditProfileMain.jsx';

FlowRouter.route('/', {
	action() {
		mount(LandingPage)
	}
});

FlowRouter.route('/friends', {
	action() {
		if (Meteor.userId()) {
			mount(MainLayout, {
				content: () => (<FriendsMain />),
			})
		} else {
			FlowRouter.redirect('/');
		}
	}
})

FlowRouter.route('/profile/:id', {
	action(params, queryParams) {
		if (Meteor.userId()) {
			mount(MainLayout, {
				content: () => (<ProfileMain href={params.id} />),
			})
		} else {
			FlowRouter.redirect('/');
		}
	}
});

FlowRouter.route('/convos', {
	action() {
		if (Meteor.userId()) {
			mount(MainLayout, {
				content: () => (<ClustersMain />),
			})
		} else {
			FlowRouter.redirect('/');
		}
	}
})

FlowRouter.route('/edit', {
	action() {
		if (Meteor.userId()) {
			mount(MainLayout, {
				content: () => (<EditProfileMain />)
			})
		}
	}
})

FlowRouter.route('/create/convo', {
	action(params, queryParams) {
		if (Meteor.userId()) {
			mount(MainLayout, {
				content: () => (<CreateCluster user={queryParams.user} Id={queryParams.Id}/>),
			})
		} else {
			FlowRouter.redirect('/');
		}
	}
})

FlowRouter.route('/conversation/view/:id', {
	action(params, queryParams) {
		if (Meteor.userId()) {
			mount(MainLayout, {
				content: () => (<ConversationMain convo_Id={params.id} />),
			})
		} else {
			FlowRouter.redirect('/');
		}
	}
})
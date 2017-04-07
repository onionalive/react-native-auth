import React, { Component } from 'react';
import { View, Text } from 'react-native';
import firebase from 'firebase';
import { Header, Button, Spinner } from './components/common';
import LoginForm from './components/LoginForm';


class App extends Component {
	state = { loggedIn: null };

	componentWillMount() {
			firebase.initializeApp({
				apiKey: 'AIzaSyAmIrzBLh6oJjTfmEA7eyAnB3m-ObJApto',
		    authDomain: 'auth-cb7ac.firebaseapp.com',
		    databaseURL: 'https://auth-cb7ac.firebaseio.com',
		    projectId: 'auth-cb7ac',
		    storageBucket: 'auth-cb7ac.appspot.com',
		    messagingSenderId: '847624725460'
			});

			firebase.auth().onAuthStateChanged((user) => {
				if (user) {
					this.setState({ loggedIn: true });
				} else {
					this.setState({ loggedIn: false });
				}
			});
	}

	renderContent() {
		switch (this.state.loggedIn) {
			case true:
			return (
				<Button onPress={() => firebase.auth().signOut()}>
					Log Out
				</Button>
			)
			case false:
				return <LoginForm />;
			default:
				<Spinner size="large"/>
		}
	}

	render() {
		return (
			<View>
				<Header headerText="Authentication" />
				{this.renderContent()}
			</View>
		);
	}
}


export default App;

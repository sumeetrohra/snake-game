import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import { Router, Route, Switch } from 'react-router-dom';

import history from './history';
import './App.css';
import { firebaseConfig } from '../firebase';

import Login from './screens/Login';
import Game from './screens/Game';
import LeaderBoard from './screens/LeaderBoard';
import PersonalScores from './screens/PersonalScores';
import Header from './Header';

class App extends React.Component {
	// Firebase and Router setup
	// ToDo: firebase google login, semantic ui, redux, scores database, router setup, leaderboard and personal scores page, play pause and stop buttons

	componentDidMount() {
		firebase.initializeApp(firebaseConfig);
		console.log(firebase.auth().currentUser);
		// this is the code to login - use this with a button inside a separate component and call the action creator for this and then store the user in localstorage and dispatch the uid to reducer, if not the do auth flow, three gameplay levels: easy, score multiplier 0.5, velocity 250, decrement 10, med: 1, 200, 10, hard: 1.5, 160 20, half tail at 2000 score
		// let provider = new firebase.auth.GoogleAuthProvider();
		// firebase.auth().signInWithPopup(provider)
		// 	.then(result => {
		// 		console.log(firebase.auth().currentUser);
		// 	})
		// 	.catch(error => console.log(error));
	}

	render() {
		return (
			<div>
				<Router history={history}>
					<div>
						<Header />
						<Switch>
							<Route path="/" exact component={Login} />
							<Route path="/game" exact component={Game} />
							<Route path="/best-scores" exact component={LeaderBoard} />
							<Route path="/personal-scores" exact component={PersonalScores} />
						</Switch>
					</div>
				</Router>
			</div>
		);
	}
}

export default App;

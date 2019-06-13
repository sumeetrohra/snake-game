import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import { Router, Route, Switch } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import history from './history';
import './App.css';
import 'semantic-ui-css/semantic.min.css'
import { firebaseConfig } from '../firebase';

import Login from './screens/Login';
import Game from './screens/Game';
import LeaderBoard from './screens/LeaderBoard';
import PersonalScores from './screens/PersonalScores';

class App extends React.Component {
	// Firebase and Router setup
	// ToDo: scores database, leaderboard and personal scores page, play pause and stop buttons, three gameplay levels: easy, score multiplier 0.5, velocity 250, decrement 10, med: 1, 200, 10, hard: 1.5, 160 20, half tail at 2000 score, pass the props of path from screens to header using redux to help for the active item

	componentDidMount() {
		firebase.initializeApp(firebaseConfig);
	}

	render() {
		return (
			<Container>
				<Router history={history}>
					<div>
						<Switch>
							<Route path="/" exact component={Login} />
							<Route path="/game" exact component={Game} />
							<Route path="/best-scores" exact component={LeaderBoard} />
							<Route path="/personal-scores" exact component={PersonalScores} />
						</Switch>
					</div>
				</Router>
			</Container>
		);
	}
}

export default App;

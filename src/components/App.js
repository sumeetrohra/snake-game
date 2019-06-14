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
import GameContainer from './screens/GameContainer';
import LeaderBoard from './screens/LeaderBoard';
import PersonalScores from './screens/PersonalScores';

class App extends React.Component {
	// Firebase and Router setup
	// ToDo: scores database, leaderboard and personal scores page, three gameplay levels: easy, score multiplier 1, velocity 200, med: 2.5, 150, hard: 5, 70 half tail at 2000 score

	componentDidMount() {
		firebase.initializeApp(firebaseConfig);
	}

	render() {
		return (
			<Container textAlign='center'>
				<Router history={history}>
					<div>
						<Switch>
							<Route path="/" exact component={Login} />
							<Route path="/game" exact component={GameContainer} />
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

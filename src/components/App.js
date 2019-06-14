import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import history from './history';
import './App.css';
import 'semantic-ui-css/semantic.min.css'

import Login from './screens/Login';
import GameContainer from './screens/GameContainer';
import LeaderBoard from './screens/LeaderBoard';
import PersonalScores from './screens/PersonalScores';

class App extends React.Component {
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

import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';
import firebase from 'firebase/app';
import 'firebase/database';

import {
    gameState,
    gameDifficulty,
    scoreUpdate
} from '../../actions';
import Header from '../Header';
import {
    GAME_PLAY,
    LEVEL_SELECT,
    EASY
} from '../../constants';

class Final extends React.Component {
    state = {
        text: 'Trying to upload score to database...'
    }

    componentDidMount() {
        const unix = Math.round(+new Date()/1000);
        const { score, uid, name } = this.props;
        firebase.database().ref('/scores').push({ score, uid, name, timestamp: unix })
        .then(() => this.setState({ text: 'Score recorded successfully' }))
        .catch(() => this.setState({ text: 'Couldn\'t upload score to database, there seems to be a network error' }));
    }

    handleOnClick = (selectedGameState) => {
        this.props.gameState(selectedGameState);
        this.props.scoreUpdate(0);
    }

    render() {
        return (
            <div>
                <Header />
                <div style={{ paddingTop: '30px' }}>
                    <h2 style={{ paddingBottom: '10px' }}>Score: {this.props.score}</h2>
                    <h3 style={{ paddingBottom: '10px' }}>{this.state.text}</h3>
                    <Button.Group size='huge' secondary>
                        <Button onClick={() => this.handleOnClick(GAME_PLAY)}>Play Again</Button>
                        <Button.Or />
                        <Button onClick={() => {
                            this.handleOnClick(LEVEL_SELECT);
                            this.props.gameDifficulty(EASY);
                        }}>Reset</Button>
                    </Button.Group>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ status, auth }) => {
    return { score: status.score, uid: auth.uid, name: auth.name };
}

export default connect(mapStateToProps, { gameState, gameDifficulty, scoreUpdate })(Final);

import React from 'react';
import { Button } from 'semantic-ui-react';
import { connect } from 'react-redux';

import {
    gameState,
    gameDifficulty
} from '../../actions';
import {
    GAME_PLAY,
    EASY,
    MEDIUM,
    HARD
} from '../../constants';
import Header from '../Header';

class LevelSelect extends React.Component {
    handleOnClick = (difficulty) => {
        this.props.gameDifficulty(difficulty);
        this.props.gameState(GAME_PLAY);
    }

    render() {
        return (
            <div>
                <Header />
                <h2>Select Difficulty</h2>
                <Button.Group size='huge' secondary>
                    <Button onClick={() => this.handleOnClick(EASY)}>Easy</Button>
                    <Button.Or />
                    <Button onClick={() => this.handleOnClick(MEDIUM)}>Medium</Button>
                    <Button.Or />
                    <Button onClick={() => this.handleOnClick(HARD)}>Hard</Button>
                </Button.Group>
            </div>
        );
    }
}

export default connect(null, { gameState, gameDifficulty })(LevelSelect);

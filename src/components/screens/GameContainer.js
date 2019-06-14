import React from 'react';
import { connect } from 'react-redux';

import {
    GAME_PLAY,
    LEVEL_SELECT,
    FINAL
} from '../../constants';
import Game from './Game';
import LevelSelect from './LevelSelect';
import Final from './Final';

class GameContainer extends React.Component {
    renderUpdate() {
        if (this.props.gameState === LEVEL_SELECT) {
            return <LevelSelect />;
        } else if (this.props.gameState === GAME_PLAY) {
            return <Game />;
        } else if (this.props.gameState === FINAL) {
            return <Final />;
        }
    }

    render() {
        return (
            <div>{this.renderUpdate()}</div>
        );
    }
}

const mapStateToProps = ({ status }) => {
    const { score, gameState } = status;
    return { score: score, gameState: gameState };
}

export default connect(mapStateToProps)(GameContainer);

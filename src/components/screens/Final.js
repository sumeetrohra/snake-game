import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';

import { gameState } from '../../actions';
import Header from '../Header';
import {
    GAME_PLAY,
    LEVEL_SELECT
} from '../../constants';

class Final extends React.Component {
    handleOnClick = (selectedGameState) => {
        this.props.gameState(selectedGameState);
    }

    render() {
        console.log(this.props)
        return (
            <div>
                <Header />
                <div style={{ paddingTop: '30px' }}>
                    <h2 className="score-display" style={{ paddingBottom: '10px' }}>Score: {this.props.score}</h2>
                    <Button.Group size='huge' secondary>
                        <Button onClick={() => this.handleOnClick(GAME_PLAY)}>Play Again</Button>
                        <Button.Or />
                        <Button onClick={() => this.handleOnClick(LEVEL_SELECT)}>Reset</Button>
                    </Button.Group>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ status }) => {
    console.log(status);
    return { score: status.score };
}

export default connect(mapStateToProps, { gameState })(Final);

import {
    GAME_STATUS,
    SCORE_UPDATE,
    GAME_STATE_UPDATE,
    SET_DIFFICULTY
} from '../actions/types';
import {
    STOP,
    LEVEL_SELECT,
    EASY
} from '../constants';

// states: LEVEL_SELECT, GAME_PLAY, FINAL
// status: PLAY, PAUSE, STOP
// difficulty: EASY, MEDIUM, HARD
const INITIAL_STATE = {
    status: STOP,
    score: 0,
    gameState: LEVEL_SELECT,
    difficulty: EASY
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GAME_STATUS:
            return { ...state, status: action.payload };

        case SCORE_UPDATE:
            return { ...state, score: action.payload };

        case GAME_STATE_UPDATE:
            return { ...state, gameState: action.payload };

        case SET_DIFFICULTY:
            return { ...state, difficulty: action.payload };

        default:
            return state;
    }
}
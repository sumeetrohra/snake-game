import {
    ACTIVE_HEADER
} from '../actions/types';
import {
    GAME
} from '../constants';

const INITIAL_STATE = {
    active: GAME
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ACTIVE_HEADER:
            return { ...state, active: action.payload };

        default:
            return state;
    }
}
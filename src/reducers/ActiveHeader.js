import {
    ACTIVE_HEADER
} from '../actions/types';

const INITIAL_STATE = {
    active: 'Game'
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ACTIVE_HEADER:
            return { ...state, active: action.payload };

        default:
            return state;
    }
}
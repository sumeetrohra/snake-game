import {
    FETCH_DATA
} from '../actions/types';

const INITIAL_STATE = {
    scores: null
}

export default (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_DATA:
            return { ...state, scores:action.payload };

        default:
            return state;
    };
};
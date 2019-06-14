import { combineReducers } from 'redux';

import AuthReducer from './AuthReducer';
import ActiveHeader from './ActiveHeader';
import GameStatusReducer from './GameStatusReducer';
import ScoreReducer from './ScoreReducer';

export default combineReducers({
    auth: AuthReducer,
    header: ActiveHeader,
    status: GameStatusReducer,
    scores: ScoreReducer
});
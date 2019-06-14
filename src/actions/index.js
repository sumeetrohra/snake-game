import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import store from 'store';
import _ from 'lodash';

import history from '../components/history';

import {
    SIGN_IN,
    SIGN_OUT,
    ACTIVE_HEADER,
    GAME_STATUS,
    SCORE_UPDATE,
    GAME_STATE_UPDATE,
    SET_DIFFICULTY,
    FETCH_DATA
} from './types';

const _handleSignIn = (dispatch, details) => {
    dispatch({
        type: SIGN_IN,
        payload: details
    });
    history.push('/game');
};

const _handleSignOut = (dispatch) => {
    dispatch({
        type: SIGN_OUT
    });
    history.push('/');
    store.set('auth', null);
};

export const signIn = () => async dispatch => {
    try {
        const uid = store.get('auth').user.uid;
        const displayName = store.get('auth').user.displayName;
        _handleSignIn(dispatch, { uid, displayName });
    } catch {
        let provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider)
            .then(result => {
                const uid = result.user.uid
                const displayName = result.user.displayName;
                store.set('auth', result);
                _handleSignIn(dispatch, { uid, displayName });
            })
            .catch(err => console.log(err));
    }
}

export const signOut = () => async dispatch => {
    firebase.auth().signOut()
        .then(() => {
            _handleSignOut(dispatch);
        })
        .catch((err) => {
            _handleSignOut(dispatch);
            console.log(err);
        });
};

export const activeHeader = (path) => {
    return {
        type: ACTIVE_HEADER,
        payload: path
    };
};

// for play, pause and stop
export const gameStatus = (status) => {
    return {
        type: GAME_STATUS,
        payload: status
    };
};

// for score
export const scoreUpdate = (score) => {
    return {
        type: SCORE_UPDATE,
        payload: score
    };
};

// for levelselect, gameplay and final
export const gameState = (gameState) => {
    return {
        type: GAME_STATE_UPDATE,
        payload: gameState
    };
};

// for easy medium and hard
export const gameDifficulty = (difficulty) => {
    return {
        type: SET_DIFFICULTY,
        payload: difficulty
    };
};

export const fetchData = () => async dispatch => {
    firebase.database().ref('/scores')
    .on('value', (snapshot) => {
        dispatch({
            type: FETCH_DATA,
            payload: _.values(snapshot.val())
        });
    });
};

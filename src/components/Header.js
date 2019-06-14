import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import history from './history';

import {
    signOut,
    activeHeader
} from '../actions';
import {
    GAME,
    LEADER_BOARD,
    MY_SCORES
} from '../constants';

const Header = (props) => {
    // use this condition for going to login page if not logged in
    if (!props.name) {
        history.push('/');
    }
    return (
        <Menu inverted>
            <Menu.Item name='Game' as={Link} to='/game' onClick={() => props.activeHeader(GAME)} active={props.header === GAME} />
            <Menu.Item name='Leader Board' as={Link} to='/best-scores' onClick={() => props.activeHeader(LEADER_BOARD)} active={props.header === LEADER_BOARD} />
            <Menu.Item name='My Scores' as={Link} to='/personal-scores' onClick={() => props.activeHeader(MY_SCORES)} active={props.header === MY_SCORES} />
            <Menu.Menu position='right'>
                <Menu.Item name={props.name} />
                <Menu.Item>
                    <Button color='red' onClick={() => {
                        props.activeHeader(GAME);
                        props.signOut();
                    }} >Logout</Button>
                </Menu.Item>
            </Menu.Menu>
        </Menu>
    );
}

const mapStateToProps = ({ auth, header }) => {
    return { name: auth.name, header: header.active };
}

export default connect(mapStateToProps, { signOut, activeHeader })(Header);

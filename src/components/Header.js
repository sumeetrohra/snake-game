import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
// import history from './history';

import {
    signOut,
    activeHeader
} from '../actions';

const Header = (props) => {
    // use this condition for going to login page if not logged in
    // if (!props.name) {
    //     history.push('/');
    // }
    return (
        <Menu inverted>
            <Menu.Item name='Game' as={Link} to='/game' onClick={() => props.activeHeader('Game')} active={props.header === 'Game'} />
            <Menu.Item name='Leader Board' as={Link} to='/best-scores' onClick={() => props.activeHeader('Leader Board')} active={props.header === 'Leader Board'} />
            <Menu.Item name='My Scores' as={Link} to='/personal-scores' onClick={() => props.activeHeader('My Scores')} active={props.header === 'My Scores'} />
            <Menu.Menu position='right'>
                <Menu.Item name={props.name} />
                <Menu.Item>
                    <Button color='red' onClick={() => props.signOut()} >Logout</Button>
                </Menu.Item>

            </Menu.Menu>
        </Menu>
    );
}

const mapStateToProps = ({ auth, header }) => {
    return { name: auth.name, header: header.active };
}

export default connect(mapStateToProps, { signOut, activeHeader })(Header);

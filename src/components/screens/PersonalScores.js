import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { List, Segment } from 'semantic-ui-react';

import { fetchData } from '../../actions';
import Header from '../Header';

class PersonalScores extends React.Component {
    componentDidMount() {
        this.props.fetchData();
    }

    renderList() {
        if (this.props.scores.length > 0) {
            return this.props.scores.map((score, i) => {
                return (
                    <List.Item key={i}>
                        <List.Content>
                            <List.Header>{score.name}</List.Header>
                            {score.score}
                        </List.Content>
                    </List.Item>
                );
            });
        }
        return <div>Loading</div>;
    }

    render() {
        console.log(this.props.scores);
        return (
            <div>
                <Header />
                <Segment >
                    <List divided>
                        {this.renderList()}
                    </List>
                </Segment>
            </div>
        );
    }
}

const mapStateToProps = ({ scores, auth }) => {
    const sortedScores = _.sortBy(scores.scores, 'score').reverse().filter(score => score.uid === auth.uid);
    return { scores: sortedScores };
}
export default connect(mapStateToProps, { fetchData })(PersonalScores);
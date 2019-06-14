import React from 'react';
import { Button } from 'semantic-ui-react';
import { connect } from 'react-redux';

import {
    gameStatus,
    scoreUpdate,
    gameState
} from '../../actions';
import {
    PLAY,
    PAUSE,
    STOP,
    FINAL,
    RIGHT,
    LEFT,
    UP,
    DOWN
} from '../../constants';
import Snake from '../Snake';
import Fruit from '../Fruit';
import Header from '../Header';

const getRandomCoordinates = (ownProps) => {
    console.log(ownProps);
    let min = 1;
    let max = 98;
    let x = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
    let y = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
    return [x, y];
};

const INITIAL_STATE = {
    fruit: getRandomCoordinates(),
    direction: RIGHT,
    snakeDots: [
        [0, 0],
        [2, 0],
    ],
    velocity: 200,
    score: 0,
    scoreMultiplier: 1,
};

class Game extends React.Component {
    state = {
        fruit: getRandomCoordinates(),
        direction: RIGHT,
        snakeDots: [
            [0, 0],
            [2, 0],
        ],
        velocity: 200,
        score: 0,
        scoreMultiplier: 1
    };

    a = null;

    componentDidMount() {
        if (this.props.status === PLAY) {
            this.startGame();
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.status !== prevProps.status && this.props.status === PLAY) {
            this.startGame();
        }
        if (this.props.status !== prevProps.status && this.props.status === PAUSE) {
            clearInterval(this.snakeGameInterval);
        }
        console.log(this.state.velocity);
        this.checkBorders();
        this.checkCollision();
        this.eatFruit();
    }

    componentWillUnmount() {
        clearInterval(this.snakeGameInterval);
    }

    startGame = () => {
        this.snakeGameInterval = setInterval(this.moveSnake, this.state.velocity);
        document.onkeydown = this.onArrowKeyPress;
    }

    onArrowKeyPress = (e) => {
        e = e || window.event;
        switch (e.keyCode) {

            case 38:
                this.setState({ direction: DOWN });
                break;

            case 40:
                this.setState({ direction: UP });
                break;

            case 37:
                this.setState({ direction: LEFT });
                break;

            case 39:
                this.setState({ direction: RIGHT });
                break;

            default:
                break;
        }
    }

    moveSnake = () => {
        let dots = [...this.state.snakeDots];
        let head = dots[dots.length - 1];
        switch (this.state.direction) {
            case RIGHT:
                head = [head[0] + 2, head[1]];
                break;

            case LEFT:
                head = [head[0] - 2, head[1]];
                break;

            case UP:
                head = [head[0], head[1] + 2];
                break;

            case DOWN:
                head = [head[0], head[1] - 2];
                break;

            default:
                break;
        }
        dots.push(head);
        dots.shift();
        this.setState({ snakeDots: dots });
    }

    checkBorders() {
        let head = this.state.snakeDots[this.state.snakeDots.length - 1];
        if (head[0] >= 100 || head[1] >= 100 || head[0] <= 0 || head[1] < 0) {
            this.gameOver();
        }
    }

    checkCollision() {
        let snake = [...this.state.snakeDots];
        let head = snake[snake.length - 1];
        snake.pop();
        snake.forEach(dot => {
            if (head[0] === dot[0] && head[1] === dot[1]) {
                this.gameOver();
            }
        })
    }

    eatFruit() {
        let head = this.state.snakeDots[this.state.snakeDots.length - 1];
        let fruit = this.state.fruit;
        let score = this.state.score + 10 * this.state.scoreMultiplier
        if (head[0] === fruit[0] && head[1] === fruit[1]) {
            this.setState({
                fruit: getRandomCoordinates(),
                score: score
            });
            this.growBigger();
            // this.increaseVelocity();
        }
    }

    growBigger() {
        let newSnake = [...this.state.snakeDots];
        newSnake.unshift([]);
        this.setState({
            snakeDots: newSnake,
            scoreMultiplier: this.state.scoreMultiplier + 0.5
        });
    }

    // increaseVelocity() {
    //     if (this.state.velocity > 50) {
    //         this.setState({ velocity: this.state.velocity - 10 });
    //     }
    // }

    gameOver() {
        this.setState(INITIAL_STATE);
        this.props.gameStatus(STOP);
        clearInterval(this.snakeGameInterval);
        this.props.scoreUpdate(this.state.score);
        this.props.gameState(FINAL);
    }

    render() {
        console.log(this.props);
        return (
            <div>
                <Header />
                <Button.Group className="center aligned row">
                    <Button onClick={() => this.props.gameStatus(PLAY)}>Play</Button>
                    <Button.Or />
                    <Button onClick={() => this.props.gameStatus(PAUSE)}>Pause</Button>
                    <Button.Or />
                    <Button onClick={() => this.gameOver()}>Stop</Button>
                </Button.Group>
                <div className="board">
                    <Snake snakeDots={this.state.snakeDots} />
                    <Fruit dot={this.state.fruit} />
                </div>
                <h2 className="score-display">Score: {this.state.score}</h2>
            </div>
        );
    }
}

const mapStateToProps = ({ status }) => {
    return { status: status.status };
}

export default connect(mapStateToProps, { gameStatus, scoreUpdate, gameState })(Game);
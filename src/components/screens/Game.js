import React from 'react';

import Snake from '../Snake';
import Fruit from '../Fruit';

const getRandomCoordinates = () => {
    let min = 1;
    let max = 98;
    let x = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
    let y = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
    return [x, y];
};

const INITIAL_STATE = {
    fruit: getRandomCoordinates(),
    direction: 'RIGHT',
    snakeDots: [
        [0, 0],
        [2, 0],
    ],
    velocity: 200,
    gameStatus: 'PLAY',
    score: 0,
    scoreMultiplier: 1
}

class Game extends React.Component {
    state = INITIAL_STATE;

    componentDidMount() {

        if (this.state.gameStatus === 'PLAY') {
            setInterval(this.moveSnake, this.state.velocity);
            document.onkeydown = this.onArrowKeyPress;
        }
    }

    componentDidUpdate() {
        console.log(this.state.velocity);
        this.checkBorders();
        this.checkCollision();
        this.eatFruit();
    }

    onArrowKeyPress = (e) => {
        e = e || window.event;
        switch (e.keyCode) {

            case 38:
                this.setState({ direction: 'DOWN' });
                break;

            case 40:
                this.setState({ direction: 'UP' });
                break;

            case 37:
                this.setState({ direction: 'LEFT' });
                break;

            case 39:
                this.setState({ direction: 'RIGHT' });
                break;

            default:
                break;
        }
    }

    moveSnake = () => {
        let dots = [...this.state.snakeDots];
        let head = dots[dots.length - 1];
        switch (this.state.direction) {
            case 'RIGHT':
                head = [head[0] + 2, head[1]];
                break;

            case 'LEFT':
                head = [head[0] - 2, head[1]];
                break;

            case 'UP':
                head = [head[0], head[1] + 2];
                break;

            case 'DOWN':
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
            this.increaseVelocity();
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

    increaseVelocity() {
        if (this.state.velocity > 20) {
            this.setState({ velocity: this.state.velocity - 20 });
        }
    }

    gameOver() {
        this.setState(INITIAL_STATE);
    }

    render() {
        return (
            <div>
                <div className="board">
                    <Snake snakeDots={this.state.snakeDots} />
                    <Fruit dot={this.state.fruit} />
                </div>
                <div className="score-display">Score: {this.state.score}</div>
            </div>
        );
    }
}

export default Game;
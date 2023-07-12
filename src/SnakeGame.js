import React, { Component } from "react";
import "./SnakeGame.css";

const getInitialState = () => {
  const initialSnake = [
    [0, 0],
    [0, 1],
  ];
  const initialDirection = [0, 1];
  const initialApple = [8, 8];

  return {
    snake: initialSnake,
    direction: initialDirection,
    apple: initialApple,
  };
};

class SnakeGame extends Component {
  state = getInitialState();

  componentDidMount() {
    setInterval(this.moveSnake, 250);
    window.onkeydown = this.changeDirection;
  }

  collisionOccured = (snake) => {
    const [head, ...tail] = snake;

    for (const cell of tail) {
      if (head[0] === cell[0] && head[1] === cell[1]) return true;
    }

    return head[0] < 0 || head[1] < 0 || head[0] >= 20 || head[1] >= 20;
  };

  appleEaten = (newSnake) => {
    const head = newSnake[0];
    return this.state.apple[0] === head[0] && this.state.apple[1] === head[1];
  };

  getRandomPosition = () => Math.floor(Math.random() * 20);

  moveSnake = () => {
    const newSnake = [
      this.state.snake[0].map((v, i) => v + this.state.direction[i]),
    ];
    newSnake.push(...this.state.snake.slice(0, -1));

    if (this.appleEaten(newSnake)) {
      const apple = [this.getRandomPosition(), this.getRandomPosition()];
      newSnake.push([]);
      this.setState({ snake: newSnake, apple });
    } else if (this.collisionOccured(newSnake)) {
      this.setState(getInitialState());
    } else {
      this.setState({ snake: newSnake });
    }
  };

  changeDirection = (event) => {
    const { direction } = this.state;
    const directions = {
      ArrowUp: [-1, 0],
      ArrowDown: [1, 0],
      ArrowRight: [0, 1],
      ArrowLeft: [0, -1],
    };

    const newDirection = directions[event.key];

    if (newDirection && newDirection.some((v, i) => v !== direction[i])) {
      this.setState({ direction: newDirection });
    }
  };

  render() {
    return (
      <div className="game-area">
        {this.state.snake.map((dot, i) => {
          return (
            <div
              className="dot"
              key={i}
              style={{ top: `${dot[0] * 5}%`, left: `${dot[1] * 5}%` }}
            />
          );
        })}
        <div
          className="apple"
          style={{
            top: `${this.state.apple[0] * 5}%`,
            left: `${this.state.apple[1] * 5}%`,
          }}
        />
      </div>
    );
  }
}

export default SnakeGame;

import React, { Component } from "react";
import SnakeGame from "./SnakeGame";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>React Snake Game</h1>
        <SnakeGame />
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import Square from './Square'
import './App.css';

class Board extends Component {

  constructor(){
    super()
    this.state = {
      player1: true,
      game: ['', '', '', '', '', '', '', '', ''],
      message: '',
      inPlay: true,
      score1: 0,
      score2: 0
    }
  }

  // start = () => {
  //   this.setState(game);
  // }

  reportMark = (pos) => {
    if(!this.state.inPlay){
      return null;
    }
    let mark = this.state.player1 ? 'X' : 'O';
    console.log(`Player ${mark} at position ${pos}`)

    // set my mark in the game array
    if(this.state.game[pos] === ''){
      let game = this.state.game
      game[pos] = mark
      this.setState({ game })
      this.checkWin(mark)
      this.flip()
    }
  }

  flip  = () => {
    let player1 = !this.state.player1
    this.setState({
      player1
    })
  }

  checkWin = (mark) => {
    let game = this.state.game 
    if(
      (game[0] === mark &&  game[3] === mark  &&  game[6] === mark) ||
      (game[1] === mark &&  game[4] === mark  &&  game[7] === mark) ||
      (game[2] === mark &&  game[5] === mark  &&  game[8] === mark) ||

      (game[0] === mark &&  game[1] === mark  &&  game[2] === mark) ||
      (game[3] === mark &&  game[4] === mark  &&  game[5] === mark) ||
      (game[6] === mark &&  game[7] === mark  &&  game[8] === mark) ||

      (game[0] === mark &&  game[4] === mark  &&  game[8] === mark) ||
      (game[2] === mark &&  game[4] === mark  &&  game[6] === mark) 
      )
      {
      this.setState({
        message: `PLAYER ${(mark === 'X') ? 1: 2} WINS!!!!`, inPlay: false,
      })
      if(mark === 'X') {
        let score1 = this.state.score1 + 1
        this.setState({score1})
      }
      if(mark === 'O') {
        let score2 = this.state.score2 + 1
        this.setState({score2})
      } 
    // } else {
    //     this.setState({
    //       message: 'Tie Game!', inPlay: false
    //     })
    }
  }

  replay = () => {
    this.setState({ game: ['', '', '', '', '', '', '', '', ''], inPlay: true, message: ''})
    if(this.state.player1 !== true)
      this.setState({ player1: true})
  }

  reset = () => {
    this.setState({ game: ['', '', '', '', '', '', '', '', ''], inPlay: true, message: '', score1: 0, score2: 0})
    if(this.state.player1 !== true)
      this.setState({ player1: true})
  }


  render() {

    let squares = []

    for(let i = 0; i < 9; i++){
      squares.push( <Square 
                      key={i} 
                      pos={i} 
                      mark={this.state.game[i]}
                      reportMark={this.reportMark} // giving my function to Square
                      /> )
    }

    return (
      <div id="main">
        <div className="scoreboard">
          <h1>React-Tac-Toe!</h1>
          <hr/>
          <h2>Player One Score: {this.state.score1} | Player Two Score: {this.state.score2}</h2>
          <hr/>
          <div>
            <button onClick={this.replay}>One More Game</button>
            <button onClick={this.reset}>Start Over</button>
          </div>
        </div>
        <h4>Player {this.state.player1 ? 'One\'s turn' : 'Two\'s turn' }</h4>
        <h3>{this.state.message}</h3>

        <div className="board">
          {squares}
        </div>
      </div>
    );
  }
}

export default Board;



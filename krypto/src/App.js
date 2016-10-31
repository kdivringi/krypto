import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Cards from './Cards.js';
import Board from './Board.js';
import Toolbar from './Toolbar.js';

class App extends Component {

  constructor() {
    super();
    this.newGame = this.newGame.bind(this);
    this.canAddNumber = this.canAddNumber.bind(this);
    this.addCard = this.addCard.bind(this);
    this.reset = this.reset.bind(this);

    this.state = {
      orig_cards: [],
      cards: [],
      eqs: [],
      board: [],
      target: -1,
      score: 0
    }
  }

  newGame() {
    let addToDeck = function(deck, start, end, number) {
    // Utility function for adding cards to deck
    for (let i = 0; i < number; i++) {
      for (let j = start; j <= end; j++) {
        deck.push(j);
        }
      }
    }
    let deck = [];
    // 3 of 1-6
    addToDeck(deck, 1, 6, 3);
    // 4 of 7-10
    addToDeck(deck, 7, 10, 4);
    // 2 of 11-17
    addToDeck(deck, 11, 17, 2);
    // 1 of 18-25
    addToDeck(deck, 18, 25, 1);

    // Draw the cards
    // TODO: Error checking
    const cards = [];
    for (let i = 0; i < 5; i++) {
      let num = Math.floor(Math.random()*deck.length);
      cards.push({
        value:String(num)
      });
      deck.splice(num, 1);
      }
    const target = Math.floor(Math.random()*deck.length);

    this.setState({
      orig_cards: [...cards],
      cards: cards,
      eqs: [],
      board: [],
      target: target,
      score: 0
      });
  }

  reset() {
    this.setState({
      cards: [...this.state.orig_cards],
      eqs: [],
      board: [],
      score: 0
    });
  }

  canAddNumber () {
    // True if an operation is the last thing on the board or if it's empty
    if (this.state.board.length===0) {
      return true;
    } else if ("-+/*".includes(this.state.board[this.state.board.length -1].value)) {
      return false;
    } else {
      return true;
    }
  }

  addCard(card) {
    if (!this.canAddNumber()) {
      return
    }
    // Create copy of cards & board state
    const cards = [...this.state.cards];
    const board = [...this.state.board];
    let ind = card
    let moved = cards.splice(ind,1)
    board.push(moved[0]);
    this.setState({
      'cards':cards,
      'board':board
    });
  }

  render() {
    return (
      <div className="App container-fluid">
        <h2>Krypto!</h2>
        <p className="lead">Use the cards and basic arithmetic to reach the target number below.</p>
        <ul>
        <li>You must use all of the cards exactly once</li>
        <li>Whole and non-negative numbers only</li>
        </ul>
        <Toolbar newGame={this.newGame} reset={this.reset}/>
        <Cards cards={this.state.cards}
               addCard={this.addCard}/>
        <Board board={this.state.board}/>
      {/*
        <Ops/>
        <Eqs/>
        <Score/>*/}
      </div>
    );
  }
}

export default App;

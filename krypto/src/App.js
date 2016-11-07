import React, { Component } from 'react';
import './App.css';
import Cards from './Cards.js';
import Board from './Board.js';
import Toolbar from './Toolbar.js';
import Ops from './Ops.js';
import Score from './Score.js';
import Eqs from './Eqs.js';

class App extends Component {

  constructor() {
    super();
    this.newGame = this.newGame.bind(this);
    this.reset = this.reset.bind(this);
    this.canAddNumber = this.canAddNumber.bind(this);
    this.addCard = this.addCard.bind(this);
    this.removeCard = this.removeCard.bind(this);
    this.addOp = this.addOp.bind(this);
    this.calculateScore = this.calculateScore.bind(this);
    this.addEq = this.addEq.bind(this);
    this.removeEq = this.removeEq.bind(this);

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
        value:String(deck[num])
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
      return true;
    } else {
      return false;
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
    let moved = cards.splice(ind, 1);
    board.push(moved[0]);
    const score = this.calculateScore(board);
    this.setState({
      cards: cards,
      board: board,
      score: score
    });
  }

  removeCard(card) {
    // Also works on ops on the board
    if (card !== this.state.board.length - 1) {
      return
    }
    const cards = [...this.state.cards];
    const board = [...this.state.board];
    let moved = board.splice(card, 1);
    const new_state = {}
    if (!"-+/*".includes(moved[0].value)) {
      cards.push(moved[0]);
    } else {
      const score = this.calculateScore(board);
      new_state['score'] = score
    }
    new_state['cards'] = cards;
    new_state['board'] = board;
    this.setState(new_state);
  }

  addOp(op) {
    if (this.canAddNumber()){
      return
    }
    const board = [...this.state.board];
    board.push({'value': op});
    this.setState({
      board: board
    });
  }

  calculateScore(board) {
      const score = eval(board.map((e) => {return e.value}).join(""));
      return score;
  }

  addEq() {
    if (this.state.board.length < 3) {
      return;
    }
    const eqs = [...this.state.eqs];
    const cards = [...this.state.cards];
    const new_eq = {
      value: '(' + this.state.board.map((e) => {return e.value}).join("") + ')',
      terms: [...this.state.board]
    }
    eqs.unshift(new_eq);
    cards.push(new_eq);
    this.setState({
      board: [],
      cards: cards,
      eqs: eqs,
      score: 0
    })
  }

  removeEq(eq) {
    // Going to be a bit stupid and just remove the last one
    if (eq !== 0) {
      return
    }

    const eqs = [...this.state.eqs];
    const cards = [...this.state.cards];
    const last = eqs.shift(0);
    const ind = cards.indexOf(last);
    cards.splice(ind, 1);
    const new_terms = last.terms.filter((e) => {return !"-+/*".includes(e.value)});
    this.setState({
      eqs: eqs,
      cards: cards.concat(new_terms)
    });
  }

  render() {
    return (
      <div className="App">
        <h1 className="Title">Krypto!</h1>
        <p className="Lead">Use the cards and basic arithmetic to reach the target number below.</p>
        <p>You must use all of the cards exactly once</p>
        <p className="Instructions">Whole and non-negative numbers only</p>
        <Toolbar newGame={this.newGame} reset={this.reset}/>
        <Ops addOp={this.addOp}/>
        <Cards cards={this.state.cards}
               addCard={this.addCard}/>
        <Board board={this.state.board}
              removeCard={this.removeCard}
              canAddNumber={this.canAddNumber}
              addEq={this.addEq}
              eqs={this.state.eqs}
              target={this.state.target}/>
        <Eqs eqs={this.state.eqs}
              removeEq={this.removeEq}
              board={this.state.board}/>
        <Score score={this.state.score} target={this.state.target}
              newGame={this.newGame} reset={this.reset}
              cards={this.state.cards}/>
        <footer>
        <p>
          Read more about 
          <a href="https://en.wikipedia.org/wiki/Krypto_(game)">
          Krypto</a>
        </p>
        <p>See the code for this <a href="https://github.com/kdivringi/krypto">here</a></p>
        <p>Read about this on my <a href="http://kdivringi.github.io/new-version-of-krypto-in-react.html#new-version-of-krypto-in-react">blog</a></p>
        </footer>
      </div>
    );
  }
}

export default App;

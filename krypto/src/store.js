import { createStore } from 'redux';
import {Card, Op, Paren} from './cardUtils';

// Default state
const defaultState = {
      orig_cards: [],
      cards: [],
      eqs: [],
      board: [],
      target: -1,
      score: 0
}

// Actions

function newGame() {
	return {
		type: "NEW_GAME"
	}
}

function reset() {
	return {
		type: "RESET"
	}
}

function addCard(index) {
	return {
		type:"ADD_CARD",
		index
	}
}

function removeCard(index) {
	return {
		type:"REMOVE_CARD",
		index
	}
}

function addOp(op) {
	return {
		type:"ADD_OP",
		op
	}
}

function addEq() {
	return {
		type:"ADD_EQ"
	}
}

function removeEq() {
	return {
		type:"REMOVE_EQ"
	}
}

const actions = {
	newGame,
	reset,
	addCard,
	removeCard,
	addOp,
	addEq,
	removeEq
}

// Utility functions

function canAddNumber (state) {
    // True if an operation is the last thing on the board or if it's empty
    if (state.board.length===0) {
      return true;
    } else if (state.board[state.board.length -1] instanceof Op) {
      return true;
    } else {
      return false;
    }
  }

function calculateScore(board) {
      const board_paren = new Paren(board);
      const score = board_paren.calculate();
      return score;
  }


// Reducer logic
export function rootReducer(state = defaultState, action) {
	let new_state = {}
	// Game level action types
	switch(action.type) {
		case "NEW_GAME":
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
		    let cards = [];
		    for (let i = 0; i < 5; i++) {
		      let num = Math.floor(Math.random()*deck.length);
		      cards.push(new Card(deck[num]));
		      deck.splice(num, 1);
		      }
		    const target = deck[Math.floor(Math.random()*deck.length)];
			return {
				...defaultState,
				cards,
				orig_cards: cards,
				target
			}
		case "RESET":
			return {
				...defaultState,
				orig_cards: state.orig_cards,
				cards: state.orig_cards,
				target: state.target
			}
		// Board & card level actions
		case "ADD_CARD":
			if (!canAddNumber(state)) {
				return state
			}
			new_state = {...state}
		    let moved = new_state.cards.splice(action.index, 1);
	        new_state.board.push(moved[0]);
		    new_state.score = calculateScore(new_state.board);
		    return new_state
		case "REMOVE_CARD":
		    if (action.index !== state.board.length - 1) {
		      return state
		    }
			new_state = {...state};
		    let removed = new_state.board.splice(action.index, 1);
		    if (!(removed[0] instanceof Op)) {
		      new_state.cards.push(removed[0]);
		    } else {
		      new_state.score = calculateScore(new_state.board);
		    }
			return new_state
		case "ADD_OP":
			return state
		case "ADD_EQ":
			return state
		case "REMOVE_EQ":
			return state
		default:
			return state
	}
}

const store = createStore(rootReducer, defaultState);

export default store
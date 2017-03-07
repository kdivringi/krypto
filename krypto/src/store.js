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
		    let moved = new_state.cards[action.index]//.splice(action.index, 1);
		    new_state.cards = new_state.cards.filter((e, i) => i !== action.index);
	        new_state.board = [...new_state.board, moved];
		    new_state.score = calculateScore(new_state.board);
		    return new_state
		case "REMOVE_CARD":
		    if (action.index !== state.board.length - 1) {
		      return state
		    }
			new_state = {...state};
		    let removed = new_state.board[action.index];//.splice(action.index, 1);
		    new_state.board = new_state.board.filter((e, i) => i !== action.index)
		    if (!(removed instanceof Op)) {
		      new_state.cards = [...new_state.cards, removed];
			}
	      	new_state.score = calculateScore(new_state.board);
			return new_state
		case "ADD_OP":
		    if (canAddNumber(state)){
		      return state
		    }
		    new_state = {...state};
		    new_state.board = [...new_state.board, new Op(action.op)];
			return new_state
		case "ADD_EQ":
		    if (state.board.length < 3) {
		      return state
		    }
			new_state = {...state}
			let new_eq = new Paren([...new_state.board]);
			new_state.eqs = [new_eq, ...new_state.eqs];
			new_state.cards = [...new_state.cards, new_eq];
			new_state.board = []
			new_state.score = 0
			return new_state
		case "REMOVE_EQ":
			if (state.eqs.length === 0) {
				return state
			}
			new_state = {...state}
			let eq_removed = new_state.eqs[0]
			new_state.eqs = new_state.eqs.slice(1)
			if (new_state.board.includes(eq_removed)) {
				new_state.cards = [...new_state.cards,
									...new_state.board.filter((e) => e!==eq_removed &&
										!(e instanceof Op))]
				new_state.board = []
			}
			new_state.cards = [...new_state.cards.filter((e) => e!==eq_removed), 
							...eq_removed.value.filter((e) => !(e instanceof Op))]
			new_state.score = calculateScore(new_state.board)
			return new_state
		default:
			return state
	}
}

const store = createStore(rootReducer, defaultState);

export default store
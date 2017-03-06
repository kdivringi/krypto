import {Card, Op, Paren} from './cardUtils';
import {rootReducer} from './store';

const c1 = new Card(2);
const c2 = new Card(3);
const c3 = new Card(5);
const c4 = new Card(7);
const c5 = new Card(10);
const p1 = new Paren([c3, new Op("*"), c4])
const p2 = new Paren([p1, new Op("+"), c5])

const test_state = {
	orig_cards:[c1,c2,c3,c4,c5],
	cards: [c1,c2],
	eqs: [p2, p1],
	board: [p2],
	target: 25,
	score: 45

}

// Test new game
it("New game makes everything new again", () => {
	const out_state = rootReducer(test_state, {type:"NEW_GAME"});
	expect(out_state.cards.length).toBe(5);
	expect(out_state.board).toEqual([]);
	expect(out_state.eqs).toEqual([]);
	expect(out_state.score).toBe(0);
	expect(out_state.orig_cards).not.toBe(test_state.orig_cards);
})

// Test reset
it("Reset clears & resets things", () => {
	const out_state = rootReducer(test_state, {type:"RESET"});
	expect(out_state.cards).toBe(test_state.orig_cards);
	expect(out_state.board).toEqual([]);
	expect(out_state.eqs).toEqual([]);
	expect(out_state.score).toBe(0);
	expect(out_state.orig_cards).toBe(test_state.orig_cards);
})

// Test add card: empty board, op at end, regular
it("Add card normally empty board", () => {
	const out_state1 = rootReducer(test_state, {type:"RESET"})
	const out_state2 = rootReducer(out_state1, {type:"ADD_CARD", index: 0})
	expect(out_state2.score).toBe(2);
	expect(out_state2.board.length).toBe(1);
	expect(out_state2.cards.length).toBe(4);
})

// Test remove card, remove op (not added to cards)
it("Remove card normally (empty board", () => {
	const out_state1 = rootReducer(test_state, {type:"RESET"})
	const out_state2 = rootReducer(out_state1, {type:"ADD_CARD", index: 0})
	const out_state3 = rootReducer(out_state2, {type:"REMOVE_CARD", index: 0})
	expect(out_state3.score).toBe(0);
	expect(out_state3.board.length).toBe(0);
	expect(out_state3.cards.length).toBe(5);
})

// Test add opp (valid & invalid)
it("Add Op Normally to valid board", () => {
	const out_state1 = rootReducer(test_state, {type:"ADD_OP", op:"-"});
	const out_state2 = rootReducer(out_state1, {type:"ADD_CARD", index:1});
	expect(out_state1.score).toEqual(test_state.score);
	expect(out_state2.score).toBe(42);
	expect(out_state1.board.length).toBe(2);
	expect(out_state2.board.length).toBe(3);
	// expect(out_state1.cards.length).toBe(2);
	// expect(out_state2.cards.length).toBe(1);
})
// Test add eq (valid & invalid empty or incomplete)

// Test remove eq (remove from board if present in the board)


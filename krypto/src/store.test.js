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

it("Remove Op shouldn't be added to cards", () => {
	const out_state1 = rootReducer(test_state, {type:"ADD_OP", op:"+"})
	const out_state2 = rootReducer(out_state1, {type:"REMOVE_CARD", index:1})
	expect(out_state1.cards.length).toBe(out_state2.cards.length)
})

// Test add opp (valid & invalid)
it("Add Op Normally to valid board", () => {
	const out_state1 = rootReducer(test_state, {type:"ADD_OP", op:"-"});
	const out_state2 = rootReducer(out_state1, {type:"ADD_CARD", index:1});
	expect(out_state1.score).toEqual(test_state.score);
	expect(out_state2.score).toBe(42);
	expect(out_state1.board.length).toBe(2);
	expect(out_state2.board.length).toBe(3);
	expect(out_state1.cards.length).toBe(2);
	expect(out_state2.cards.length).toBe(1);
})

it("Shouldn't be able to add op to empty board or to leading op", () => {
	const empty_state = rootReducer(test_state, {type:"RESET"})
	const out_state1 = rootReducer(empty_state, {"type":"ADD_OP", op:"+"})
	const out_state2 = rootReducer(test_state, {type:"ADD_OP", op:"/"})
	const out_state3 = rootReducer(out_state2, {type:"ADD_OP", op:"*"})
	expect(out_state1).toBe(empty_state);
	expect(out_state3).toBe(out_state2);

})

// Test add eq (valid & invalid empty or incomplete)
it("Can't create a paren with less than 3 terms", () => {
	const out_state = rootReducer(test_state, {type:"ADD_EQ"})
	expect(out_state).toBe(test_state);
})

it("Test new paren works", () => {
	const out_state1 = rootReducer(test_state, {type:"ADD_OP", op:"+"})
	const out_state2 = rootReducer(out_state1, {type:"ADD_CARD", index:1})
	const out_state3 = rootReducer(out_state2, {type:"ADD_EQ"})
	expect(out_state3.eqs.length).toBe(3)
	expect(out_state3.board.length).toBe(0)
	expect(out_state3.cards.length).toBe(2)
	expect(out_state3.eqs[0].calculate()).toBe(48)	
})

// Test remove eq (remove from board if present in the board)
it("Test remove paren works (present in board & not", () => {
	const out_state1 = rootReducer(test_state, {type:"REMOVE_EQ"}) // Paren on board
	const out_state2 = rootReducer(out_state1, {type:"REMOVE_EQ"}) // Paren not on board
	const out_state3 = rootReducer(out_state2, {type:"REMOVE_EQ"}) // No parens
	expect(out_state1.board.length).toBe(0)
	expect(out_state1.eqs.length).toBe(1)
	expect(out_state1.cards.length).toBe(4)
	expect(out_state1.score).toBe(0)
	expect(out_state2.board.length).toBe(0)
	expect(out_state2.eqs.length).toBe(0)
	expect(out_state2.cards.length).toBe(5)
	expect(out_state3).toBe(out_state2)
})

import {Card, Op, Paren} from './cardUtils';

it('Regular card returns number for calculate, string for display', () => {
	const c = new Card(3);
	expect(c.calculate()).toBe(3);
	expect(c.display()).toBe("3");
})

it("Operation returns string for value, correct function for each optype", () => {
	const o_plus = new Op("+");
	const o_minus = new Op("-");
	const o_times = new Op("*");
	const o_divide = new Op("/");
	expect(o_plus.display()).toBe("+");
	expect(o_minus.display()).toBe("-");
	expect(o_times.display()).toBe("*");
	expect(o_divide.display()).toBe("/");
	expect(o_plus.calculate()(3,3)).toBe(6);
	expect(o_minus.calculate()(3,3)).toBe(0);
	expect(o_times.calculate()(3,3)).toBe(9);
	expect(o_divide.calculate()(3,3)).toBe(1);
})

it("Single item parenthesis display and calculate", () => {
	const p = new Paren([new Card(3)]);
	expect(p.display()).toBe("(3)");
	expect(p.calculate()).toBe(3);
})

it("3 item parenthesis", () => {
	const p = new Paren([new Card(3), new Op("+"), new Card(2)]);
	expect(p.display()).toBe("(3 + 2)");
	expect(p.calculate()).toBe(5)
});
	
it("incomplete parenthesis", () => {
	const p = new Paren([new Card(3), new Op("+")]);
	expect(p.display()).toBe("(3 +)");
	expect(p.calculate()).toBe(3);
})


it("Nested parenthesis", () => {
	const p1 = new Paren([new Card(3), new Op("+"), new Card(2)]);
	const p2 = new Paren([new Card(10), new Op("/"), p1]);
	expect(p2.display()).toBe("(10 / (3 + 2))");
	expect(p2.calculate()).toBe(2)
})
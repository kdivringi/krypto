export class Card {
	constructor(value, id = "") {
		this.value = value
		this.id = "c" + id;
	}

	display () {
		return String(this.value)
	}

	calculate () {
		return this.value
	}
}

export class Op extends Card {

	display() {
		return this.value
	}

	calculate() {
		return {
			"+": (a, b) => a + b,
			"-": (a, b) => a - b,
			"*": (a, b) => a * b,
			"/": (a, b) => a / b
		}[this.value]
	}
}

export class Paren extends Card {

	constructor(value, id = "") {
		super(value)
		this.id = this.value
					.filter(e => !(e instanceof Op))
					.map(e => e.id)
					.join("");
	}

	display() {
		const inner = this.value.map((e) => e.display()).join(" ");
		return `(${inner})`
	}

	calculate() {
		if (this.value.length === 0) {
			return 0;
		}
		let value = this.value[0].calculate();
		let index = 1;
		while (index + 1 < this.value.length) {
			let operator_func = this.value[index].calculate();
			let next_val = this.value[index + 1].calculate();
			value = operator_func(value, next_val);
			index += 2;
		}
		return value
	}
}
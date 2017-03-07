// Actions

export function newGame() {
	return {
		type: "NEW_GAME"
	}
}

export function reset() {
	return {
		type: "RESET"
	}
}

export function addCard(index) {
	return {
		type:"ADD_CARD",
		index
	}
}

export function removeCard(index) {
	return {
		type:"REMOVE_CARD",
		index
	}
}

export function addOp(op) {
	return {
		type:"ADD_OP",
		op
	}
}

export function addEq() {
	return {
		type:"ADD_EQ"
	}
}

export function removeEq() {
	return {
		type:"REMOVE_EQ"
	}
}
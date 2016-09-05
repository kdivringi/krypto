var cards;

var board;

var pmode = false;
// Newgame function
	// Picks correct distribution of cards
	// Sets data structure to cards & blank board
var newGame = function() {
	
	// Build the deck of possible cards
	var deck = [];
	// 3 of 1-6
	addToDeck(deck, 1, 6, 3);
	// 4 of 7-10
	addToDeck(deck, 7, 10, 4);
	// 2 of 11-17
	addToDeck(deck, 11, 17, 2);
	// 1 of 18-25
	addToDeck(deck, 18, 25, 1);

	// Draw the cards
	cards = [];
	for (var i = 0; i < 6; i++) {
		var num = Math.floor(Math.random()*deck.length);
		cards.push(new TopCard(deck[num]));
		deck.splice(num, 1);
	}
	renderCards();
	// Clear board
	board = [];
	renderBoard();
}

var addToDeck = function(deck, start, end, number) {
	// Utility function for adding cards to deck
	for (var i = 0; i < number; i++) {
		for (var j = start; j <= end; j++) {
			deck.push(j);
		}
	}
}

// This should only be called once per new game or re-written
var renderCards = function () {
	// Add the first 5 cards to the card area
	var newtext = cards.slice(0,5).map(function (card) {
		return card.render();
	}).join(" ");
	$("#cards").html(newtext);
	$(".topCard").click(topCardClick);
	// Add the last card to the goal area
	$("#goal").text(String(cards[5].num));

	// Total is zero
	$("#total").text("0");
}

var validateBoard = function () {
	// Reset everything
	board.forEach(function (t) {
		t.leading = false;
		t.trailing = false;
		t.valid = true;
	})
	// Set leading & trailing
	if (board.length==1) {
		board[0].trailing = true;
		board[0].leading = true;
		board[0].valid = true;
		updateScore();
	} else if (board.length > 1) {
		board[0].leading = true;
		last = board[board.length - 1];
		last.trailing = true;
		if ("/*+-()".includes(last.expr)) 
			last.valid = false;
		else {
			last.valid = true;
			updateScore();
		}
	}
	//
}

var updateScore = function () {
	var score = eval(board.map(function (c) {return c.expr})
		.join(" "));
	$("#total").text(score);
	if (cards.slice(0,5).every(function (c) {return c.used}) &&
		score===cards[5].num) {
		// They win!
		alert("You win!");
	}
}

//Render board function
var renderBoard = function () {
	validateBoard()
	$("#board").html("");
	// Go through and render the list
	board.map(function (b) {
		$(b.render())
		.data("term", b)
		.appendTo($("#board"));
	})
	// Add the remove event listener for the trailing number/op
	$(".trailing").click(function (ev) {
		var last = board.pop();
		if (last.valid) {
			cards.filter(function (c) {
				return c.used && c.num === last.expr
			})[0].used = false;
		}
		renderBoard();
		renderCards();
	})
}


// Move function
	// Top card -> Adds to expressions, sets other card inactive, adds operators if not last card
var topCardClick = function (ev) {
	// If last term is valid, can't add a card
	if ((board.length != 0) && (board[board.length - 1].valid))
		return;
	var num = Number(ev.target.text);
	var index = cards.slice(0,5)
		.map(function (c) {
			if (c.used)
				return -1;
			else
				return c.num;
		}).indexOf(num)
	if (cards[index].used) {
		return;
	} else {
		// If last term is invalid or board is [], can add
		cards[index].used = true;
		renderCards();
		board.push(new Term(cards[index].num));
		renderBoard();
	}
}

// Operator -> Adds to expression, enables top cards if available
var opClick = function (ev) {
	if (board.length == 0) {
		return;
	} else if (!board[board.length - 1].valid) {
		return;
	} else if (cards.slice(0,5).every(function (c) {return c.used;})) {
		return;
	} else {	
		var op = ev.target.text;
		board.push(new Term(op));
		renderBoard();
	}

}

	// Parenthesis -> 
	//	No rparen on leading, no lparen on trailing
	// No parens around just one term

// Term
	// render:
		// Number: Add button, parenthesis hover left if not trailing, right if not leading or term paren
		// Op: If trailing, 4 buttons
		// Pgroup: Same rules as number, able to return inner group if parenthesis is deleted

function TopCard(num) {
	this.num = num;
	this.used = false;
}

TopCard.prototype.render = function() {
	var active = this.used ? " disabled" : "";
	return "<a class=\"btn btn-default btn-lg topCard" + active + "\">" + this.num + "</a>"
}

function Term(expr) {
	this._expr = expr;
	this.trailing = false; // Last item in board
	this.leading = true; // First item in board
	this.valid = false; // Whether last item is an operator or not
	this.actual = true; // Whether just for visualization, no expr val
	};

Object.defineProperty(Term.prototype, "expr", {
	get: function() {
		if (this.actual){
			return this._expr;
		} else {
			return " "
		}
	}
})


Term.prototype.render = function () {
	var extra = "";
	var pre = "<a class=\"btn btn-default btn-lg lparen\">(</a> ";
	var post = " <a class=\"btn btn-default btn-lg rparen\">)</a>";
	if (this.leading) {
		extra += " leading";
		post = "";
	}
	if (this.trailing) {
		extra += " trailing";
		pre = "";
	}
	if (!this.valid) {
		extra += " invalid";
		pre = "";
		post = "";
	}
	if (!pmode) {
		pre = "";
		post ="";
	}
	return pre + "<a class=\"btn btn-default btn-lg" 
		+ extra + "\">" + this.expr + "</a>" 
		+ post;
};

// Parenthesis subclass of Term
function Paren(terms) {
	Term.call(this, terms);
}

// Expr returns joined inner terms
Paren.prototype = Object.create(Term.prototype);
Object.defineProperty(Paren.prototype, "expr", {
	get:function() {
		if (this.actual) {
			return "( " + this._expr
			.map(function (e) {return e.expr;})
			.join(" ") + " )";
		} else {
			return " ";
		}
	}
})

var makeParens = function () {
	if (board.length < 3) { // Not enough terms
		pmode = false;
		return;
	} else if (pmode && board.every(function (b) {return b.actual})) {
		// No nonactual objs, left parenthesis time
		var numbers = board.filter(function (b) {
			return !"/*+-()".includes(b.expr) && // Not just an operation
				!b.expr.includes("("); // Not parenthesis either
		});
		for (var i = 0; i < numbers.length; i++) {
			if (numbers[i].trailing) {
				// Add to a leading, we know it's at least 3
				continue;
			} else {
				// We know it's not the last, and that the last is not an operator
				var newp = new Term("(");
				newp.actual = false; //Other properties set by validation
				board.splice(board.indexOf(numbers[0]),0,newp);
			}
		}


	} else if (pmode && board.some(function (b) {return b.actual && b.expr==="("})) {
		// Actual lparen detected, right parenthesis time
		// Get index of selected, actual lparen
		var lparen = board.filter(function (b) {
			return b.expr==="(" && b.actual;
		})[0];
		// Delete all nonactual lparens
		var todel = board.filter(function (b) {
			return b.expr==="(" && !b.actual;
		});
		for (var i = 0; i < todel.length; i++) {
			board.splice(board.indexOf(todel[i]),1);
		}
		// rparen as appropriate on the rest
		var subset = board.slice(board.indexOf(lparen), board.length - 1)
			.filter(function (b) {
			return !"/*+-()".includes(b.expr) && // Not just an operation
				!b.expr.includes("("); // Not parenthesis either
		});
		for (var i = 0; i < subset.length; i++) {
			if (i===0) { // No rparen around just one term
				continue;
			} else {
				var newp = new Term(")");
				newp.actual = false;
				board.splice(board.indexOf(subset[i]), 0, newp);
			}
		}
	} else {
		// pmode is off or cancelled, remove all nonactual & nonvalid parens
		var todel = board.filter(function (b) {return "()".includes(b.expr);});
		for (var i = 0; i < todel.length; i++) {
			board.splice(board.indexOf(todel[i]),1);
		}
	}
	
	// Adding array logic
	// while less than length of array
	// If only 1 number until, no parens
	// If only 2 numbers, only outer parenthesis
	// If an actual but invalid left paren, 
	// remove other non-actual left parens,
	// and only far enough away right parens
}

// Wire up the op buttons
$(".btn-op").click(opClick);
$(".btn-par").click(function (ev) {
	// If last is an operator, ignore
	if (!board[board.length -1].valid) {
		return;
	}
	pmode = !pmode;
	makeParens();
	renderBoard();

	//Event Listeners for lparen, rparen
})

// TODO: Actual onload section
// TODO: Error messages instead of alert
// TODO: Check for fractions/negative numbers
// TODO: Better GUI hints for what actions are available
// TODO: Fix score for when an op is removed
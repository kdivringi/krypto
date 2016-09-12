var cards;

var start_cards;

var board;

var parens = [];

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
	start_cards = cards.slice();
	renderCards();
	// Clear board
	board = [];
	parens = [];
	renderBoard();
	pmode = false;
}

var addToDeck = function(deck, start, end, number) {
	// Utility function for adding cards to deck
	for (var i = 0; i < number; i++) {
		for (var j = start; j <= end; j++) {
			deck.push(j);
		}
	}
}

var reset = function() {
	board = [];
	parens = []
	cards = start_cards.slice();
	cards.forEach(function (c) {c.used = false;})
	renderCards();
	renderBoard();
}

var renderCards = function () {
	// Add the first 5 cards to the card area
	// var newtext = cards.slice(0,5).map(function (card) {
		// return card.render();
	// }).join(" ");
	$('#cards').html("");
	cards.slice(0,length - 1).map(function (c) {
		$(c.render())
		.data("term", c)
		.appendTo("#cards");
	});
	$(".topCard").click(topCardClick);
	// Add the last card to the goal area
	$("#goal").text(String(cards[cards.length-1].num));
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
	var score = eval(board.map(function (c) {return c.value()})
		.join(" "));
	$("#total").text(score);
	if (cards.slice(0,cards.length-1).every(function (c) {return c.used}) &&
		Number(score)===cards[cards.length-1].num) {
		// They win!
		alert("You win!");
	}
}

//Render board function
var renderBoard = function () {
	if (parens!=[]) {

	}
	validateBoard()
	$("#board").html("");
	// Go through and render the list
	board.map(function (b) {
		$(b.render())
		.data("term", b)
		.appendTo($("#board"));
	})
	// Add the equals button if necessary
	if (board.length > 2 && board[board.length - 1].valid===true) {
		$('<a class="btn btn-default btn-lg btn-eq">=</a>').appendTo($("#board"));
		// Call back here
		$('.btn-eq').click(function (ev) {
			// debugger
			var newp = new Paren(board);
			// Find the numbers in the new parenthesis
			var to_remove = board.filter(function (b) {
				return !"*/+-".includes(b.expr);
			});
			for (var i = 0; i < to_remove.length; i++) {
				// Find the first used card corresponding to each number
				if (to_remove[i] instanceof Paren) {
					var card = cards.filter(function (c) {
						return c._expr === to_remove[i]._expr;
					})[0]
				} else {
					var card = cards.filter(function (c) {
						return c.num===Number(to_remove[i].expr) && c.used;
					})[0];
				// Remove the card from cards
				}
			cards.splice(cards.indexOf(card),1);
			}
			// Ugly re-jigger to make it behave like a topcard (should merge classes)
			newp.used = false;
			newp.extra_base = " topCard";
			newp.num = newp.expr;
			// Add the parenthesis
			cards.splice(cards.length - 1,0,newp);
			parens.push(board);
			board = [];
			renderCards();
			renderBoard();
		});
	}
	// Insert the parenthesis sections of the board here
	$("#parens").html("");
	for (var i = 0; i < parens.length; i++) {
		$("<hr><p>").appendTo("#parens");
		parens[i].map(function (p) {
			$(p.render())
			.appendTo($("#parens"));
		});
		var score = eval(parens[i].map(function (p) {return p.value()}).join(" "))
		$('<a class="btn btn-default btn-lg btn-eq">=' + score + '</a>')
			.data("p_index", i)
			.click(function (ev) {
				// Clicking on parens area equals button removes the parens
				var i = $.data(ev.target, "p_index");
				var terms = parens.splice(i,1)[0];
				removeParens(i, terms);
				renderCards();
				renderBoard();
			})
			.appendTo($("#parens"));
		$("</p>").appendTo("#parens");
	}
var removeParens = function (ind, terms) {
	// Check for dependent parens
	for(var i = ind; i < parens.length; i++) {
		var to_delete = parens[i].filter(function (p) {
			if (p instanceof Paren) {
				return p._expr === terms;
			} else {
				return false;
			}
		});
		if (to_delete.length > 0) {
			var new_terms = parens.splice(i, 1)[0];
			removeParens(i, new_terms);
		}
	}
	
	debugger
	// If no parens, straightforward
	var to_remove = cards.filter(function (c) {
		return c._expr === terms;
	})[0]
	cards.splice(cards.indexOf(to_remove), 1);
	for (var i = 0; i < terms.length; i++) {
		if (terms[i] instanceof Paren) {
			// Add parens obj with same hacks
			var newp = new Paren(terms[i]._expr);
			newp.used = false;
			newp.extra_base = " topCard";
			newp.num = newp.expr;
			cards.splice(cards.length -1, 0, newp);
		} else if ("-+/*".includes(terms[i].expr)) {
			continue;
		} else {
			// Add term back in
			var newc = new TopCard(Number(terms[i].expr));
			cards.splice(cards.length -1, 0, newc)
		}
	}

}
	// Add the remove event listener for the trailing number/op
	$(".trailing").click(function (ev) {
		var last = board.pop();
		if (last.valid) {
			var term = $.data(ev.target, "term");
			if (term instanceof Paren) {
				cards.filter(function (c) {
					return c._expr===term._expr;
				})[0].used = false;
			} else {
				cards.filter(function (c) {
					return c.used && c.num === Number(last.expr)
				})[0].used = false;
			}
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
	var card = $.data(ev.target, 'term')
	if (card.used) {
		return;
	} else {
		// If last term is invalid or board is [], can add
		card.used = true;
		renderCards();
		if (card instanceof Paren) {
			board.push(new Paren(card._expr));
		} else {
			board.push(new Term(card.num));
		}
		renderBoard();
	}
}

// Operator -> Adds to expression, enables top cards if available
var opClick = function (ev) {
	if (pmode) {return;}
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
	this.extra_base = "";
	};

// TODO: Is this really necessary now?
Object.defineProperty(Term.prototype, "expr", {
	get: function() {return String(this._expr);}
})

Term.prototype.value = function () {
	if (!"()".includes(this.expr)) {
			return this.expr;
		} else {
			return " "
		}
}
Term.prototype.render = function () {
	var extra = this.extra_base;
	if (this.leading) {
		extra += " leading";
	}
	if (this.trailing) {
		extra += " trailing";
	}
	if (!this.valid) {
		extra += " invalid";
	}
	return "<a class=\"btn btn-default btn-lg" 
		+ extra + "\">" + this.expr + "</a>";
};

// Parenthesis subclass of Term
function Paren(terms) {
	Term.call(this, terms);
}

// Expr returns joined inner terms
Paren.prototype = Object.create(Term.prototype);
Object.defineProperty(Paren.prototype, "expr", {
	get:function() {
		return "( " + this._expr
		.map(function (e) {return e.expr;})
		.join(" ") + " )";
	}
})

$(function () {
	newGame();
	// Wire up the op buttons
	$(".btn-op").click(opClick);
	
	$("#goal").text(String(cards[5].num));

	// Total is zero
	$("#total").text("0");

});
// TODO: Actual onload section
// TODO: Error messages instead of alert
// TODO: Check for fractions/negative numbers
// TODO: Better GUI hints for what actions are available
// TODO: Fix score for when an op is removed
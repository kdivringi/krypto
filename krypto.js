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
	// Go through and render the list
	$("#board").html(board.map(function (c) {return c.render()})
		.join(" "));
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
	// Set active/inactive states on top cards
	// Draws expression area
		//
	// Checks/updates score area


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


// Wire up the op buttons
$(".btn-op").click(opClick);
$(".btn-par").click(function (ev) {
	pmode = !pmode;
	// Procedure: Adds the left parens, index of children = array index
	// non-actual are not visualized
	// actual but not valid is an unmatched parenthesis
	// Right parenthesis shown for selection
	// paren is valid and actual when both are there

	//if pmode : logic to add in non-actual paren elems

	renderBoard();
	//Event Listeners for lparen, rparen
		//Mark as selected
		//
})

// TODO: Actual onload section
// TODO: Error messages instead of alert
// TODO: Check for fractions/negative numbers
// TODO: Better GUI hints for what actions are available
// TODO: Fix score for when an op is removed
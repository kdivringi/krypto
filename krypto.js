var cards;

var board;

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
		t.valid = false;
	})
	// Set leading & trailing
	if (board.length==1) {
		board[0].trailing = true;
		board[0].leading = true;
		board[0].valid = true;
	} else if (board.length > 1) {
		board[0].leading = true;
		last = board[board.length - 1];
		last.trailing = true;
		if ("/*+-".includes(last.expr)) 
			last.valid = false;
		else
			last.valid = true;
	}
	//
}
//Render board function
var renderBoard = function () {
	validateBoard()
	$("#board").html(board.map(function (c) {return c.render()})
		.join(" "));
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

var opClick = function (ev) {
	if (board.length == 0) {
		return;
	} else if (!board[board.length - 1].valid) {
		return;
	} else {	
		var op = ev.target.text;
		board.push(new Term(op));
		renderBoard();
	}

}

	// Operator -> Adds to expression, enables top cards if available
	// Parenthesis Start ->
	// Parenthesis End ->

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
	this.expr = expr;
	this.trailing = false;
	this.leading = true;
	this.valid = false;
	};

Term.prototype.render = function () {
	var extra = "";
	if (this.leading)
		extra += " leading";
	if (this.trailing)
		extra += " trailing";
	if (!this.valid)
		extra += " invalid";
	return "<a class=\"btn btn-default btn-lg" + extra + "\">" + this.expr + "</a>";
};


// Wire up the op buttons
$(".btn-op").click(opClick);
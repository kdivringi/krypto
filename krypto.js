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
}

var addToDeck = function(deck, start, end, number) {
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
	$(".topCard").click(topCardClick)
	// Add the last card to the goal area
	$("#goal").text(String(cards[5].num));

	// Total is zero
	$("#total").text("0");
}


//Render board function
	// Set active/inactive states on top cards
	// Draws expression area
		//
	// Checks/updates score area


// Move function
	// Top card -> Adds to expressions, sets other card inactive, adds operators if not last card
var topCardClick = function (ev) {
	var num = Number(ev.target.text);
	var index = cards.slice(0,5).map(function (c) {return c.num}).indexOf(num)
	if (cards[index].used) {
		return;
	}
	else {
		cards[index].used = true;
		renderCards();
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
	return "<a class=\"btn btn-default btn-lg\">" + this.expr + "</a>";
};

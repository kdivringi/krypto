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
	var cards = [];
	for (var i = 0; i < 6; i++) {
		var num = Math.floor(Math.random()*deck.length);
		cards.push(deck[num]);
		deck.splice(num, 1);
	}
	return cards;

}

var addToDeck = function(deck, start, end, number) {
	for (var i = 0; i < number; i++) {
		for (var j = start; j <= end; j++) {
			deck.push(j);
		}
	}
}
var renderCards = function (cards) {
	// Add the first 5 cards to the card area

	var newtext = ""
	cards.slice(0,5).forEach(function (card) {
		newtext += "<a class=\"btn btn-default btn-lg\">" +
		String(card) + "</a>"
	});
	$("#cards").html(newtext);
	// Add the last card to the goal area
	$("#goal").text(String(cards.pop()));
}


//Render board function
	// Set active/inactive states on top cards
	// Draws expression area
		//
	// Checks/updates score area


// Move function
	// Top card -> Adds to expressions, sets other card inactive, adds operators if not last card
	// Operator -> Adds to expression, enables top cards if available
	// Parenthesis Start ->
	// Parenthesis End ->

// Term
	// render:
		// Number: Add button, parenthesis hover left if not trailing, right if not leading or term paren
		// Op: If trailing, 4 buttons
		// Pgroup: Same rules as number, able to return inner group if parenthesis is deleted

function Term(expr) {
	this.expr = expr;
	this.trailing = false;
	this.leading = true;
	this.valid = false;
	};

Term.prototype.render = function () {
	return "<a class=\"btn btn-default btn-lg\">" + this.expr + "</a>";
};

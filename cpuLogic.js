const readline = require("readline");
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

// Function to collect a sequence of colors from the user
function askForColor() {
	if (playerOneSequence.length < 3) {
		rl.question("Enter R for Red or B for Black: ", (input) => {
			let userInput = input.toUpperCase(); // Collect user input and convert to uppercase
			if (userInput === "R" || userInput === "B") {
				playerOneSequence.push(userInput.toLowerCase()); // Convert to lowercase and add to the array
				askForColor(); // Recursively ask for the next color
			} else {
				console.log("Invalid input. Please enter only 'R' or 'B'.");
				askForColor(); // Ask again for the same input
			}
		});
	} else {
		console.log("Player One Sequence:", playerOneSequence); // Output the sequence to the console
		let computerSeq = computerSequence(playerOneSequence); // Calculate and show the computer's sequence
		console.log("Computer Sequence:", computerSeq);
		rl.close();
		const deck = createAndShuffleDeck(); // Create and shuffle a deck of cards
		displayAndCheck(deck, playerOneSequence, computerSeq); // Check sequences against the deck
	}
}

// Function to generate the computer's sequence based on the player's sequence
function computerSequence(inputColors) {
	let newColors = [];

	if (inputColors[1] === "r") {
		newColors[0] = "b";
	} else {
		newColors[0] = "r";
	}

	newColors[1] = inputColors[0];
	newColors[2] = inputColors[1];

	return newColors; // Return the new color sequence
}

let playerOneSequence = []; // Initialize an empty array
askForColor(); // Start the input collection process

// Function to create and shuffle a deck of 52 cards evenly split between 'r' and 'b'
function createAndShuffleDeck() {
	let deck = [];
	for (let i = 0; i < 26; i++) {
		deck.push("r");
		deck.push("b");
	}

	for (let i = deck.length - 1; i > 0; i--) {
		let j = Math.floor(Math.random() * (i + 1));
		[deck[i], deck[j]] = [deck[j], deck[i]]; // Shuffle using Fisher-Yates algorithm
	}
	return deck;
}

// Function to display each card drawn and check if it matches the player or computer sequence
function displayAndCheck(deck, playerSequence, computerSequence) {
    let drawnCards = [];
    let index = 0;
    let matchFound = false;
    let firstMatchOwner = ""; // To store who got the first matching sequence

    while (!matchFound && index < deck.length) {
        drawnCards.push(deck[index]); // Draw the next card
        console.log(`Card drawn: ${deck[index]}`); // Display the drawn card
        index++;

        if (index >= 3) {
            // Check if the current sequence matches the player's sequence
            if (checkSequence(drawnCards.slice(-3), playerSequence)) {
                matchFound = true;
                firstMatchOwner = "Player 1"; // Assign the match to Player 1
            }
            // Check if the current sequence matches the computer's sequence
            else if (checkSequence(drawnCards.slice(-3), computerSequence)) {
                matchFound = true;
                firstMatchOwner = "Computer"; // Assign the match to the Computer
            }
        }
    }

    if (matchFound) {
        console.log(`A matching sequence has been found: ${drawnCards.slice(-3)} by ${firstMatchOwner}`);
    } else {
        console.log("No matching sequence found in the deck.");
    }
}


// Function to check if the last three drawn cards match a given sequence
function checkSequence(lastThreeCards, sequence) {
	return (
		lastThreeCards[0] === sequence[0] &&
		lastThreeCards[1] === sequence[1] &&
		lastThreeCards[2] === sequence[2]
	);
}

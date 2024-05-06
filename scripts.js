document.addEventListener("DOMContentLoaded", function () {
	let player1 = { sequence: [], balance: 1000, bet: 0, odds: 2 };
	let player2 = { sequence: [], balance: 1000, bet: 0, odds: 1 };
	let currentDeck = [];
	const minBet = 20;
	const maxBet = 500;

	function generateDeck() {
		let newDeck = [];
		for (let i = 0; i < 26; i++) {
			newDeck.push("Red");
			newDeck.push("Black");
		}
		return newDeck;
	}

	function shuffleDeck(deck) {
		for (let i = deck.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[deck[i], deck[j]] = [deck[j], deck[i]];
		}
	}

	function displayDeck() {
		const deckArea = document.getElementById("deck-area");
		deckArea.innerHTML = "";
		const cardBack = document.createElement("img");
		cardBack.src = "path/to/card-back-image.jpg";
		cardBack.alt = "Card Back";
		deckArea.appendChild(cardBack);
	}

	function initializeGame() {
		currentDeck = generateDeck();
		shuffleDeck(currentDeck);
		displayDeck();
		promptPlayerSequence("player1").then(() => {
			promptPlayerSequence("player2").then(() => {
				updateUI(); // Ensures UI is updated after all settings
			});
		});
	}

	function promptPlayerSequence(player) {
		return new Promise((resolve) => {
			let sequence = prompt(
				`Enter three card colors (R for Red, B for Black) for ${player}:`
			);
			if (sequence) {
				let sequenceArray = sequence
					.toUpperCase()
					.split(/[\s,]+/)
					.map((color) => (color === "R" ? "Red" : "Black"));
				if (
					sequenceArray.length === 3 &&
					sequenceArray.every((color) => color === "Red" || color === "Black")
				) {
					if (player === "player1") {
						player1.sequence = sequenceArray;
					} else {
						player2.sequence = sequenceArray;
					}
					resolve();
				} else {
					alert(
						"Invalid sequence. Please enter three colors (R for Red, B for Black)."
					);
					promptPlayerSequence(player); // Recursive call if invalid
				}
			} else {
				// Handle cancellation of prompt
				alert("Sequence entry cancelled. Setting default sequence.");
				resolve(); // Resolve the promise to prevent hanging
			}
		});
	}

	document
		.getElementById("bet-amount")
		.addEventListener("input", updatePlayerBet);

	function updatePlayerBet() {
		const betInput = document.getElementById("bet-amount");
		const betAmount = parseInt(betInput.value, 10);
		if (!isNaN(betAmount) && betAmount >= minBet && betAmount <= maxBet) {
			player1.bet = betAmount;
			document.getElementById("player1-bet").textContent =
				"Bet Amount: $" + player1.bet;
			player2.bet = betAmount; // Assuming Player 2 matches Player 1's bet automatically
			document.getElementById("player2-bet").textContent =
				"Bet Amount: $" + player2.bet;
		}
	}

	function clearChoices() {
		player1.sequence = [];
		player2.sequence = [];
		player1.bet = 0;
		player2.bet = 0;

		document.getElementById("player1-sequence").textContent =
			"Player 1 Sequence: ";
		document.getElementById("player2-sequence").textContent =
			"Player 2 Sequence: ";
		updateUI();
	}

	function updateUI() {
		document.getElementById("player1-balance").textContent =
			"Player 1 Balance: $" + player1.balance;
		document.getElementById("player2-balance").textContent =
			"Player 2 Balance: $" + player2.balance;
		document.getElementById("deck-count").textContent =
			"Cards Remaining in Deck: " + currentDeck.length;
		document.getElementById("game-message").textContent =
			"Round ready. Players make your bets and choices!";
	}

	function startRound() {
		resetGameSurface();
		currentDeck = generateDeck();
		shuffleDeck(currentDeck);

		let gameSequence = [];
		let winner = null;

		for (let i = 0; i < 6; i++) {
			let drawnCard = currentDeck.pop();
			gameSequence.push(drawnCard);
			updateGameSurface(drawnCard);

			if (gameSequence.length >= 3) {
				if (checkSequence(gameSequence, player1.sequence)) {
					winner = "Player 1";
					player1.balance += calculatePayout(player1.bet, player1.odds);
					player2.balance -= player1.bet;
					break;
				} else if (checkSequence(gameSequence, player2.sequence)) {
					winner = "Player 2";
					player2.balance += player1.bet;
					player1.balance -= player1.bet;
					break;
				}
			}
		}

		updateUI();
		displayWinner(winner, gameSequence);
	}

	function updateGameSurface(card) {
		const gameSurface = document.getElementById("game-surface");
		const cardElement = document.createElement("div");
		cardElement.textContent = card;
		gameSurface.appendChild(cardElement);
	}

	function checkSequence(gameSequence, playerSequence) {
		let lastThreeCards = gameSequence.slice(-3);
		return (
			lastThreeCards.length === 3 &&
			lastThreeCards.every((card, index) => card === playerSequence[index])
		);
	}

	function calculatePayout(bet, odds) {
		return bet * odds;
	}

	function displayWinner(winner, gameSequence) {
		const messageArea = document.getElementById("game-message");
		messageArea.textContent = winner
			? `${winner} wins this round with sequence: ${gameSequence.join(", ")}`
			: "No winner this round. Continue playing!";
	}

	function resetGameSurface() {
		const gameSurface = document.getElementById("game-surface");
		gameSurface.innerHTML = "";
	}

	document
		.getElementById("start-game")
		.addEventListener("click", initializeGame);
	document
		.getElementById("clear-choices")
		.addEventListener("click", clearChoices);
	document.getElementById("play-button").addEventListener("click", startRound);
	document.getElementById("pass-button").addEventListener("click", function () {
		player2.balance -= player1.bet; // Assume passing means forfeiting the round
		player1.balance += player1.bet;
		updateUI();
	});
});

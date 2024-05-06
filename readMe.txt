Welcome to the Documentation for Chris's Game!

This README provides detailed information about the JavaScript functions used in the game, their purposes, and how they interact to create a functional and interactive card game.

1. Overview:
Chris's Game is a card game implemented using JavaScript, where two players compete by betting on sequences of card colors. The game uses a deck of red and black cards, and the players' goal is to predict sequences that will appear as cards are drawn from the deck.

2. Game Initialization:
initializeGame(): Sets up the game by generating a new deck, shuffling it, and displaying the deck's back image to signify readiness. This function is bound to the 'Start Game' button.

3. Deck Functions:
generateDeck(): Creates a new deck consisting of an equal number of red and black cards.
shuffleDeck(deck): Shuffles the provided deck using the Fisher-Yates shuffle algorithm to ensure random card distribution.

4. Gameplay Functions:
startRound(): Begins a new game round by resetting the game surface, regenerating and shuffling the deck, and managing the sequence of card draws and checks for winning sequences.
updateGameSurface(card): Updates the central game surface to display each card as it is drawn from the deck.

5. User Interactions:
clearChoices(): Resets player choices, including sequences and bets, and clears the display areas for a fresh start. This function is linked to the 'Clear Choices' button.
Event listeners on 'Play' and 'Pass' buttons allow Player 2 to either match Player 1's bet or pass the round, respectively.

6. Utility Functions:
checkSequence(gameSequence, playerSequence): Checks if the last three cards drawn match the sequence selected by a player.
calculatePayout(bet, odds): Calculates the payout based on the bet amount and the set odds if a player wins the round.
displayWinner(winner, gameSequence): Displays the result of the round on the game message area, indicating the winner and the sequence that led to the win.

7. UI Updates:
updateUI(): Refreshes the UI elements to reflect the current game state, including player balances, active sequences, and the number of remaining cards in the deck.

8. Event Listeners:
Event listeners are set up for game control buttons ('Start Game', 'Play', 'Pass', 'Clear Choices') to handle user interactions and game progression effectively.

This script ensures a dynamic and engaging game experience through meticulous state management and responsive UI updates. For a detailed guide on how to play the game, refer to the included gamePlay.txt.
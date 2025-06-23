
// JavaScript for Hangman Game
const words = ['JAVASCRIPT', 'BOOTSTRAP', 'HANGMAN', 'PROGRAMMING'];
let selectedWord = '';
let guessedLetters = [];
let remainingGuesses = 6;
let incorrectGuesses = [];

// Randomly select a word
function selectWord() {
    const randomIndex = Math.floor(Math.random() * words.length);
    selectedWord = words[randomIndex];
    guessedLetters = [];
    incorrectGuesses = [];
    remainingGuesses = 6;
    displayWord();
    displayLetters();
    updateGameStatus();
}

// Display the word with guessed letters
function displayWord() {
    const wordDisplay = selectedWord.split('').map(letter => {
        return guessedLetters.includes(letter) ? letter : '_';
    }).join(' ');
    document.getElementById('word-display').textContent = wordDisplay;
}

// Display alphabet buttons
function displayLetters() {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    const lettersButtons = letters.map(letter => {
        return `<button class="btn btn-outline-primary btn-letter" onclick="guessLetter('${letter}')">${letter}</button>`;
    }).join('');
    document.getElementById('letters-buttons').innerHTML = lettersButtons;
}

// Handle letter guess
function guessLetter(letter) {
    if (selectedWord.includes(letter)) {
        guessedLetters.push(letter);
        document.body.style.background = "linear-gradient(45deg, #ffd700, #32cd32, #1e90ff)";
    } else {
        incorrectGuesses.push(letter);
        remainingGuesses--;
        showHangmanPart();
        document.body.style.background = "linear-gradient(45deg, #ff4b5c, #ff6a00, #fffd00)";
    }
    displayWord();
    updateGameStatus();
}

// Update game status (remaining guesses and incorrect guesses)
function updateGameStatus() {
    document.getElementById('incorrect-guesses').textContent = incorrectGuesses.join(', ');
    document.getElementById('remaining-guesses').textContent = remainingGuesses;
    if (remainingGuesses === 0) {
        alert('Game Over! You lost!');
    } else if (selectedWord.split('').every(letter => guessedLetters.includes(letter))) {
        alert('Congratulations! You won!');
   }
}

// Show hangman parts (Fixed for correct leg positioning)
function showHangmanPart() {
    switch (remainingGuesses) {
        case 5: document.getElementById('head').style.visibility = 'visible'; break;
        case 4: document.getElementById('body').style.visibility = 'visible'; break;
        case 3: document.getElementById('left-arm').style.visibility = 'visible'; break;
        case 2: document.getElementById('right-arm').style.visibility = 'visible'; break;
        case 1: document.getElementById('left-leg').style.visibility = 'visible'; break;
        case 0: document.getElementById('right-leg').style.visibility = 'visible'; break;
    }
}

// Restart the game
function restartGame() {
    selectWord();
    updateGameStatus();
    resetHangmanFigure();
}

// Reset hangman figure
function resetHangmanFigure() {
    document.querySelectorAll('.hangman > div').forEach(part => part.style.visibility = 'hidden');
}

// Initialize the game
selectWord();


let word;
let hint;
let guessedWord;
let attempts;
let usedLetters;
let gameActive = false;

const wordHints = [
    { word: "javascript", hint: "A popular programming language for web development." },
    { word: "hangman", hint: "A classic word-guessing game." },
    { word: "programming", hint: "The act of writing code to create software." },
    { word: "developer", hint: "A person who creates software applications." },
    { word: "frontend", hint: "The part of a website or app that users interact with." },
    { word: "backend", hint: "The server-side part of a web application." },
    { word: "python", hint: "A popular programming language named after a snake." }
];
const maxAttempts = 6;


function startGame() {
    const randomWord = wordHints[Math.floor(Math.random() * wordHints.length)];
    word = randomWord.word;
    hint = randomWord.hint;
    guessedWord = Array(word.length).fill('_');
    attempts = maxAttempts;
    usedLetters = [];
    gameActive = true;

    document.getElementById('word-display').textContent = guessedWord.join(' ');
    document.getElementById('attempts').textContent = attempts;
    document.getElementById('used-letters').textContent = '';
    document.getElementById('message').textContent = '';
    document.getElementById('guess-input').value = '';
    document.getElementById('guess-input').disabled = false;
    
    document.getElementById('hint').textContent = hint;
}

function makeGuess() {
    if (!gameActive) return;

    const guess = document.getElementById('guess-input').value.toLowerCase();
    document.getElementById('guess-input').value = ''; 

    if (guess === "" || usedLetters.includes(guess)) {
        return; // Ignore empty input or already used letters
    }

    usedLetters.push(guess);
    document.getElementById('used-letters').textContent = usedLetters.join(', ');

    if (word.includes(guess)) {
        updateGuessedWord(guess);
        if (guessedWord.join('') === word) {
            document.getElementById('message').textContent = "You won! The word is: " + word;
            gameActive = false;
        }
    } else {
        attempts--;
        document.getElementById('attempts').textContent = attempts;

        if (attempts === 0) {
            document.getElementById('message').textContent = "Game Over! The word was: " + word;
            gameActive = false;
        }
    }
}

function updateGuessedWord(guess) {
    for (let i = 0; i < word.length; i++) {
        if (word[i] === guess) {
            guessedWord[i] = guess;
        }
    }
    document.getElementById('word-display').textContent = guessedWord.join(' ');
}

startGame();

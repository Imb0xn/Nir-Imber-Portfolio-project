// --------------------
// Global Variables
// --------------------

let sequence = [];
let userSequence = [];
let stepCounter = 0;
let gameActive = false;

// --------------------
// Game Initialization
// --------------------

function initGame() {
    sequence = [];
    userSequence = [];
    stepCounter = 0;
    gameActive = false;
    document.getElementById('gameStatus').innerText = "Press any button to start";
    setupButtonListeners(true);
}


// Starts the game
function startGame() {
    if (!gameActive) {
        gameActive = true;
        sequence = [];
        userSequence = [];
        stepCounter = 0;
        addStepToSequence();
        setupButtonListeners(false);
    }
}

// Handles player clicks
function userClickHandler(event) {
    if (!gameActive) return;

    const clickedButtonIndex = event.target.id.replace('button', '');
    userSequence.push(parseInt(clickedButtonIndex, 10));

    activateButton(clickedButtonIndex);
    playSound(clickedButtonIndex);

    // Check if the current sequence is correct
    if (checkUserInput()) {
        if (userSequence.length === sequence.length) {
            stepCounter++;
            document.getElementById('gameStatus').innerText = `Score: ${stepCounter}`;
            userSequence = [];
            setTimeout(addStepToSequence, 1000); // Proceed to the next sequence after a short delay
        }
    } else {
        document.getElementById('gameStatus').innerText = `Game over. Your score: ${stepCounter}`;
        gameActive = false;
        gameOver();
    }
}


// Adds a new step to the sequence
function addStepToSequence() {
    const nextStep = Math.floor(Math.random() * 4) + 1;
    sequence.push(nextStep);
    displaySequence();
}

function displaySequence() {
    gameActive = false;
    let i = 0;
    const interval = setInterval(() => {
        if (i >= sequence.length) {
            clearInterval(interval);
            gameActive = true;
            return;
        }
        activateButton(sequence[i]);
        playSound(sequence[i]);
        i++;
    }, 600);
}


function checkUserInput() {
    return userSequence.every((val, index) => val === sequence[index]);
}

// --------------------
// UI Interaction
// --------------------

function activateButton(buttonIndex) {
    const button = document.getElementById(`button${buttonIndex}`);
    button.classList.add('active');
    setTimeout(() => button.classList.remove('active'), 300);
}

function setupButtonListeners(isInitial) {
    const buttons = document.querySelectorAll('.colorButton');
    buttons.forEach(button => {
        button.removeEventListener('click', isInitial ? startGame : userClickHandler);
        button.addEventListener('click', isInitial ? startGame : userClickHandler);
    });
}

// --------------------
// Sound Management
// --------------------

function playSound(buttonIndex) {
    const frequencies = [261.63, 293.66, 329.63, 349.23]; // Frequencies for C4, D4, E4, F4 notes
    const context = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = context.createOscillator();
    const gainNode = context.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(context.destination);

    oscillator.frequency.value = frequencies[buttonIndex - 1];
    gainNode.gain.setValueAtTime(0, context.currentTime);
    gainNode.gain.linearRampToValueAtTime(1, context.currentTime + 0.01);
    oscillator.start(context.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 1);
    oscillator.stop(context.currentTime + 1);
}

// --------------
// Top Score Code 
// ---------------

function showNameInput() {
    document.getElementById('nameModal').style.display = 'block';
}

function gameOver() {
    const playerName = prompt("Game Over. Enter your name for the scoreboard:", "Anonymous");

    const name = playerName || 'Anonymous';
    saveScore(name, stepCounter);

    setTimeout(initGame, 2000);
}

function saveScore(name, score) {
    const newScore = { name, score };

    const scores = JSON.parse(localStorage.getItem('scores')) || [];

    scores.push(newScore);
    scores.sort((a, b) => b.score - a.score);

    const topScores = scores.slice(0, 10);

    localStorage.setItem('scores', JSON.stringify(topScores));

    displayScores();
}

function displayScores() {
    const scores = JSON.parse(localStorage.getItem('scores')) || [];
    const scoreList = document.getElementById('scoreList');

    scoreList.innerHTML = '';

    scores.forEach(score => {
        const li = document.createElement('li');
        li.textContent = `${score.name}: ${score.score}`;
        scoreList.appendChild(li);
    });
}
// Clear the scores from local storage

function resetScoreboard() {
    localStorage.removeItem('scores');

    displayScores();
}

// Resets the score to avoid scores spamming on page
function resetScoreboard() {
    localStorage.removeItem('scores');

    displayScores();
}

document.getElementById('resetScoreboardButton').addEventListener('click', resetScoreboard);

// --------------------
// Initialize Game on Load
// --------------------

document.addEventListener('DOMContentLoaded', () => {
    initGame();
    displayScores();
});

document.addEventListener('DOMContentLoaded', initGame);


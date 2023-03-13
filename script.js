'use strict';

// Selecting elements
const player0Elem = document.querySelector('.player--0');
const player1Elem = document.querySelector('.player--1');
const score0Elem = document.querySelector('#score--0');
const score1Elem = document.getElementById('score--1');
const curr0Elem = document.getElementById('current--0');
const curr1Elem = document.getElementById('current--1');
const diceElem = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// Global variables
let totalScores, currScore, activePlayer, playing;

// Starting conditions
const __init__ = () => {
  totalScores = [0, 0];
  currScore = 0;
  activePlayer = 0;
  playing = true;

  score0Elem.textContent = 0;
  score1Elem.textContent = 0;
  curr0Elem.textContent = 0;
  curr1Elem.textContent = 0;
  diceElem.classList.add('hidden');
  player0Elem.classList.add('player--active');
  player0Elem.classList.remove('player--winner');
  player1Elem.classList.remove('player--active', 'player--winner');
};

__init__();

// Switch player
const switchPlayer = () => {
  currScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent = currScore;
  activePlayer = activePlayer === 0 ? 1 : 0;

  player0Elem.classList.toggle('player--active');
  player1Elem.classList.toggle('player--active');
};

// Rolling dice functionality
btnRoll.addEventListener('click', () => {
  if (playing) {
    // Generate a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // Display dice
    diceElem.classList.remove('hidden');
    diceElem.src = `dice-${dice}.png`;

    // Check for rolled 1: if true, switch to next player
    if (dice !== 1) {
      // Add dice to current score
      currScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currScore;
    } else {
      // Switch to next player
      switchPlayer();
    }
  }
});

// Hold functionality
btnHold.addEventListener('click', () => {
  if (playing) {
    // Add curr score to active player's score
    totalScores[activePlayer] += currScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      totalScores[activePlayer];

    // Check if player's score is >= 50
    if (totalScores[activePlayer] >= 50) {
      playing = false;
      diceElem.classList.add('hidden');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // Switch to next player
      switchPlayer();
    }
  }
});

// New game (reset all values to initial state)
btnNew.addEventListener('click', __init__);

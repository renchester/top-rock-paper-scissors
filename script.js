'use strict';

/*

DOM SELECTIONS

*/

const overlayDiv = document.querySelector('.overlay-div');

const queryModal = document.querySelector('.query-modal');
const queryInput = document.querySelector('.query-input');

const rpsHeader = document.querySelector('.rps-header');
const rpsContainer = document.querySelector('.rps-container');
const rpsLabels = document.querySelectorAll('.rps-label');
const rpsWrappers = document.querySelectorAll('.rps-wrapper');

const resultContainer = document.querySelector('.result-container');
const resultStatus = document.querySelector('.result-status');

const playerScoreEl = document.querySelector('.player-score');
const computerScoreEl = document.querySelector('.computer-score');
const roundsPlayedEl = document.querySelector('.round-played');

const endgameModal = document.querySelector('.endgame-modal');
const endgameStatus = document.querySelector('.endgame-status');
const endgameDesc = document.querySelector('.endgame-desc');

const btnQuery = document.querySelector('.btn-query');
const btnStart = document.querySelector('.btn-start');
const btnPlay = document.querySelector('.btn-play');

/*

GAME STATE DECLARATIONS

*/

const choices = ['rock', 'paper', 'scissors'];
let winningScore = 0;
let scores = [0, 0];
let playerScore = scores[0];
let computerScore = scores[1];
let roundsPlayed = 0;
let gameState = true;

/*

GAME INITIALIZING FUNCTIONS

*/

function generateComputerPlay() {
  const choiceIndex = Math.floor(Math.random() * choices.length);
  const computerSelection = choices[choiceIndex];
  return computerSelection;
}

function initializeGame() {
  queryModal.classList.remove('hidden');
  overlayDiv.classList.add('overlay');
}

function submitInput(e) {
  e.preventDefault();
  winningScore = +queryInput.value;

  overlayDiv.classList.remove('overlay');
  queryModal.classList.add('hidden');
  rpsContainer.classList.remove('hidden');
  rpsHeader.classList.remove('hidden');
  btnStart.classList.add('hidden');
}

function evaluateRPS(playerSel, computerSel) {
  let roundResult;

  if (playerSel === computerSel) {
    roundResult = 'tie';
  } else if (playerSel === 'rock') {
    roundResult = computerSel === 'scissors' ? 'playerWin' : 'computerWin';
  } else if (playerSel === 'scissors') {
    roundResult = computerSel === 'paper' ? 'playerWin' : 'computerWin';
  } else if (playerSel === 'paper') {
    roundResult = computerSel === 'rock' ? 'playerWin' : 'computerWin';
  }

  return roundResult;
}

/*

GAME DISPLAY FUNCTIONS

*/

function displayInterface(playerSelection) {
  let label;

  // Toggles label visibility for when element is hovered
  rpsWrappers.forEach((el) =>
    el.addEventListener('mouseenter', () => {
      showLabel(el);
    })
  );
  rpsWrappers.forEach((el) =>
    el.addEventListener('mouseleave', () => {
      hideLabel(el);
    })
  );

  // Removes labels for each inactive wrapper
  rpsLabels.forEach((el) => el.classList.add('hidden'));

  // Match strat to determine which label to display
  for (let rpsLabel of rpsLabels) {
    if (!rpsLabel.classList.contains(`label-${playerSelection}`)) continue;
    else label = rpsLabel;
  }

  // Show only the selected label
  label.classList.remove('hidden');

  // Display the result scores
  resultContainer.classList.remove('hidden');

  // Remove the previous status to generate a new one per round
  resultStatus.classList.remove(resultStatus.classList[2]);
}

function displayResult(roundResult) {
  if (roundResult === 'playerWin') {
    resultStatus.textContent = 'You won! Nice moves for a human';
    resultStatus.classList.add('result-win');
    playerScore++;
  } else if (roundResult === 'computerWin') {
    resultStatus.textContent = 'You lost against the computer!';
    resultStatus.classList.add('result-lose');
    computerScore++;
  } else if (roundResult === 'tie') {
    resultStatus.textContent = 'Tie! No one wins this round';
    resultStatus.classList.add('result-tie');
  }

  scores = [playerScore, computerScore];
  roundsPlayed++;

  playerScoreEl.textContent = `Your score: ${playerScore}`;
  computerScoreEl.textContent = `Computer score: ${computerScore}`;
  roundsPlayedEl.textContent = `Rounds played: ${roundsPlayed}`;
}

function displayWin(player, computer) {
  overlayDiv.classList.add('overlay');
  endgameModal.classList.remove('hidden');

  if (player === winningScore) {
    endgameModal.classList.add('endgame-win');
    endgameStatus.textContent = 'CONGRATS!';
    endgameDesc.textContent = 'You have won this game';
  } else if (computer === winningScore) {
    endgameModal.classList.add('endgame-lose');
    endgameStatus.textContent = 'YOU SUCK!';
    endgameDesc.textContent = 'The computer has beaten you, filthy human!';
  }
}

function showLabel(el) {
  const labelToShow = el.querySelector('.rps-label');

  labelToShow.classList.remove('hidden');
}

function hideLabel(el) {
  const labelToHide = el.querySelector('.rps-label');

  labelToHide.parentElement.classList.contains('play-active')
    ? ''
    : labelToHide.classList.add('hidden');
}

/*

GAME STATE FUNCTIONS

*/

function makeActive(targetEl) {
  rpsWrappers.forEach((wrapper) => wrapper.classList.remove('play-active'));
  const parentEl = targetEl.parentNode;
  parentEl.classList.add('play-active');
}

function resetGame() {
  scores = [0, 0];
  playerScore = 0;
  computerScore = 0;
  roundsPlayed = 0;

  gameState = true;

  overlayDiv.classList.remove('overlay');
  queryModal.classList.add('hidden');
  endgameModal.classList.add('hidden');
  endgameModal.classList.remove('endgame-win');
  endgameModal.classList.remove('endgame-lose');
  resultContainer.classList.add('hidden');
  rpsWrappers.forEach((el) => el.classList.remove('play-active'));
  rpsLabels.forEach((el) => el.classList.remove('hidden'));
}

function gamePlay(e) {
  // Guard clauses
  if (!gameState) return;
  if (!e.target.classList.contains('rps-icon')) return;
  makeActive(e.target);

  // Define the round plays
  const playerSelection = e.target.dataset.selection;
  const computerSelection = generateComputerPlay();

  // Determine result
  const roundResult = evaluateRPS(playerSelection, computerSelection);
  if (!roundResult) return;

  // Load up and display the game interface
  displayInterface(playerSelection);

  // Display round result
  displayResult(roundResult);

  if (playerScore >= winningScore || computerScore >= winningScore) {
    gameState = false;
    displayWin(playerScore, computerScore);
  }
}

/*

EVENT LISTENERS

*/

btnStart.addEventListener('click', initializeGame);
btnQuery.addEventListener('click', submitInput);
rpsContainer.addEventListener('click', gamePlay);
btnPlay.addEventListener('click', resetGame);
overlayDiv.addEventListener('click', resetGame);

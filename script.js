'use strict';

// DOM Selection
const btnStart = document.querySelector('.btn-start');
let rpsHeader = document.querySelector('.rps-header');
const rpsContainer = document.querySelector('.rps-container');

// Gameplay
const choices = ['rock', 'paper', 'scissors'];
let scores = [0, 0];
let roundsPlayed = 0;

function capitalizeFirst(str) {
  return str[0].toUpperCase() + str.slice(1).toLowerCase();
}

function computerPlay() {
  const choiceIndex = Math.ceil(Math.random() * choices.length) - 1;
  const computerSelection = choices[choiceIndex];
  return computerSelection;
}

function resetGame() {
  scores = [0, 0];
  playerScore = 0;
  computerScore = 0;
  roundsPlayed = 0;
}

function init() {
  let winningScore;
  let playerScore = scores[0];
  let computerScore = scores[1];
  let resultStr;

  // Initializing the game
  // if (!winningScore) {
  //   winningScore = +prompt('How many rounds do you want to play?');
  // }

  // if (roundsPlayed === 0) {
  //   alert("Let's play rock, paper scissors!");
  // }

  rpsContainer.classList.remove('hidden');
  rpsHeader.classList.remove('hidden');
  btnStart.classList.add('hidden');
}

function matchSelection(e) {
  // Guard clause
  if (!e.target.classList.contains('rps-icon')) return;

  const playerSelection = e.target.dataset.selection;
  const computerSelection = computerPlay();
  let roundResult;

  if (playerSelection === computerSelection) {
    roundResult = 'tie';
  } else if (playerSelection === 'rock') {
    roundResult =
      computerSelection === 'scissors' ? 'playerWin' : 'computerWin';
  } else if (playerSelection === 'scissors') {
    roundResult = computerSelection === 'paper' ? 'playerWin' : 'computerWin';
  } else if (playerSelection === 'paper') {
    roundResult = computerSelection === 'rock' ? 'playerWin' : 'computerWin';
  }
  return roundResult;
}

// Event Listeners
btnStart.addEventListener('click', init);
rpsContainer.addEventListener('click', matchSelection);

/*
 // Continuing gameplay if no one has won
  if (playerScore < winningScore && computerScore < winningScore) {
    const [roundResult, playerSelection, computerSelection] = playRound();

    if (roundResult === 'playerWin') {
      resultStr = `You win! ${capitalizeFirst(
        playerSelection
      )} beats ${computerSelection}`;
      playerScore++;
    } else if (roundResult === 'computerWin') {
      resultStr = `You lose! ${capitalizeFirst(
        computerSelection
      )} beats ${playerSelection}.`;
      computerScore++;
    } else if (roundResult === 'tie') {
      resultStr = `Tie! No one wins this round`;
    } else if (!roundResult) game();

    scores = [playerScore, computerScore];
    roundsPlayed++;

    alert(
      `${resultStr} \n Your score: ${playerScore} \n Computer score: ${computerScore} \n Tries: ${roundsPlayed}`
    );

    playGame();
  }

  // Result if a player has won

  if (playerScore === winningScore) {
    alert(`You beat the computer in ${roundsPlayed} tries! Nice!`);
    resetGame();
  } else if (computerScore === winningScore) {
    alert(`Damn, you lost even with ${roundsPlayed} tries. Tough luck!`);
    resetGame();
  }
  */

/*
  function playRound() {
  let roundResult;

  const playerInput = prompt('Pick between rock, paper, or scissors', '');
  const playerSelection = playerInput.trim().toLowerCase();
  const computerSelection = computerPlay();

  if (playerSelection === computerSelection) {
    roundResult = 'tie';
  } else if (playerSelection === 'rock') {
    roundResult =
      computerSelection === 'scissors' ? 'playerWin' : 'computerWin';
  } else if (playerSelection === 'scissors') {
    roundResult = computerSelection === 'paper' ? 'playerWin' : 'computerWin';
  } else if (playerSelection === 'paper') {
    roundResult = computerSelection === 'rock' ? 'playerWin' : 'computerWin';
  } else alert('Wrong input! Try again.');

  return [roundResult, playerSelection, computerSelection];
}
*/

'use strict';

// DOM Selection
let btnStart = document.querySelector('.btn-start');

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
// computerPlay();

function resetGame() {
  scores = [0, 0];
  playerScore = 0;
  computerScore = 0;
  roundsPlayed = 0;
}

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

function playGame() {
  const winningScore = 5;
  let playerScore = scores[0];
  let computerScore = scores[1];
  let resultStr;

  // Initializing the game
  if (roundsPlayed === 0) {
    alert("Let's play rock, paper scissors!");
  }

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
}

// Event Listeners
btnStart.addEventListener('click', playGame);

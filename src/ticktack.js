// Starts a new game
function newGame() {
  for (let n = 1; n < 10; n++) {
    clearFinishedGame(n);
  }
  winner = null;
  if (turnChoice(true)) {
    computerPlayer();
  }
  showStats();
}

// Random choice of first player
function turnChoice() {
  const decision = Math.random();
  let result = false;

  if (decision < 0.5) {
    document.turn = 'o';
  } else {
    document.turn = 'x';
  }

  if (document.turn === 'o') {
    outputToUser('You begin.');
  } else {
    outputToUser('Computer begins.');
    result = true;
  }
  return result;
}

function clearFinishedGame(number) {
  document.getElementById('box' + number).innerText = '';
}

function outputToUser(message) {
  document.getElementById('output').innerText = message;
}

function Statistics(w, l, d) {
  this.wins = w;
  this.losses = l;
  this.draws = d;
}

const user = new Statistics(0, 0, 0);
const computer = new Statistics(0, 0, 0);

// Next move/error
function nextMove(box) {
  if (winner != null) {
    outputToUser(winner + ' won. Press Replay to try again.');
  } else if (box.innerText === '') {
    box.innerText = 'o';
    newTurn();
  } else {
    outputToUser('Position taken. Try again.');
  }
}

// New turn
function newTurn() {
  if (checkForWinner(true)) {
    outputToUser('Game over: ' + winner + ' WIN');
    winLossIncrement();
  } else if (checkForDraw(true)) {
    outputToUser('Game over: DRAW');
    drawIncrement();
  } else if (document.turn === 'x') {
    document.turn = 'o';
    computerPlayer();
  } else {
    document.turn = 'x';
    computerPlayer();
  }
}

// AI opponent with random token placement
function computerPlayer() {
  let placement = Math.floor(Math.random() * 9) + 1;
  while (document.getElementById('box' + placement).innerText !== '') {
    placement = Math.floor(Math.random() * 9) + 1;
  }
  document.getElementById('box' + placement).innerText = 'x';

  if (checkForWinner(true)) {
    newTurn();
  } else if (checkForDraw(true)) {
    newTurn();
  }
}

// Access box value
function getPosition(boxNumber) {
  return document.getElementById('box' + boxNumber).innerText;
}

// Determine win
function checkForWinner() {
  let result = false;

  if (checkForWin(1, 2, 3) ||
    checkForWin(4, 5, 6) ||
    checkForWin(7, 8, 9) ||
    checkForWin(1, 4, 7) ||
    checkForWin(2, 5, 8) ||
    checkForWin(3, 6, 9) ||
    checkForWin(1, 5, 9) ||
    checkForWin(3, 5, 7)) {
    result = true;
  }
  return result;
}

// Check box value
function checkForWin(a, b, c) {
  let result = false;

  if (getPosition(a) === 'x' && getPosition(b) === 'x' && getPosition(c) === 'x') {
    result = true;
    winner = 'Computer';
  } else if (getPosition(a) === 'o' && getPosition(b) === 'o' && getPosition(c) === 'o') {
    result = true;
    winner = 'User';
  }
  return result;
}

// Determine draw
function checkForDraw() {
  const positions = [];
  let result = false;

  for (n = 1; n < 10; n++) {
    if (document.getElementById('box' + n).innerText !== '') {
      positions[n - 1] = document.getElementById('box' + n).innerText;
    } else {
      break;
    }
  }

  if (positions.length === 9) {
    result = true;
  }

  return result;
}

// Increment win/loss
function winLossIncrement() {
  if (winner === 'Computer') {
    computer.wins += 1;
    user.losses += 1;
  } else if (winner === 'User') {
    user.wins += 1;
    computer.losses += 1;
  }
}

// Increment draws
function drawIncrement() {
  user.draws += 1;
  computer.draws += 1;
}

// Display statistics
function showStats() {
  document.getElementById('uW').innerText = user.wins;
  document.getElementById('uL').innerText = user.losses;
  document.getElementById('uD').innerText = user.draws;
  document.getElementById('cW').innerText = computer.wins;
  document.getElementById('cL').innerText = computer.losses;
  document.getElementById('cD').innerText = computer.draws;
}

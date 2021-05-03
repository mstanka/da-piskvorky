'use strict';

const gameEl = document.querySelector('.game');
const btnEl = document.querySelector('.game__btn');
const iconEl = document.querySelector('.icon');
const boardSize = 10; // 10x10
const symbolsToWin = 5;
let player = 'circle';

// change player
const changePlayer = () => {
  if (player === 'circle') {
    player = 'cross';
    iconEl.setAttribute('src', './img/cross.svg');
  } else {
    player = 'circle';
    iconEl.setAttribute('src', './img/circle.svg');
  }
};

// draw circle or cross in the button field
const fillBtn = (btn, item) => {
  btn.classList.add(`game__btn--${item}`);
  btn.disabled = true;
};

// listen for click
const play = () => {
  gameEl.addEventListener('click', (e) => {
    if (player === 'circle') {
      fillBtn(e.target, 'circle');
    } else {
      fillBtn(e.target, 'cross');
    }

    if (isWinningMove(e.target)) {
      setTimeout(() => {
        confirm(
          `Vyhrává ${
            player === 'circle' ? 'kolečko' : 'křížek'
          }. Spustit novou hru?`,
        );
        location.reload();
      }, 400);
    }

    changePlayer();
  });
};

// get symbol
const getSymbol = (field) => {
  if (field.classList.contains('game__btn--circle')) {
    return 'circle';
  }
  if (field.classList.contains('game__btn--cross')) {
    return 'cross';
  }
  return undefined;
};

// get field
const getField = (row, column) => {
  const fields = document.querySelectorAll('.game__btn');
  return fields[row * boardSize + column];
};

//get position
const getPosition = (field) => {
  let fieldIndex = 0;
  const fields = document.querySelectorAll('.game__btn');
  while (fieldIndex < fields.length && field !== fields[fieldIndex]) {
    fieldIndex++;
  }

  return {
    row: Math.floor(fieldIndex / boardSize),
    column: fieldIndex % boardSize,
  };
};

// check if winning move
const isWinningMove = (field) => {
  const origin = getPosition(field);
  const symbol = getSymbol(field);

  let i;
  let j;

  /////// IN ROW
  let inRow = 1;
  // check to the left
  i = origin.column;
  while (i > 0 && symbol === getSymbol(getField(origin.row, i - 1))) {
    inRow++;
    i--;
  }

  // check to the right
  i = origin.column;
  while (
    i < boardSize - 1 &&
    symbol === getSymbol(getField(origin.row, i + 1))
  ) {
    inRow++;
    i++;
  }

  if (inRow >= symbolsToWin) {
    return true;
  }

  /////// IN COLUMN
  let inColumn = 1;
  // check up
  i = origin.row;
  while (i > 0 && symbol === getSymbol(getField(i - 1, origin.column))) {
    inColumn++;
    i--;
  }

  // check down
  i = origin.row;
  while (
    i < boardSize - 1 &&
    symbol === getSymbol(getField(i + 1, origin.column))
  ) {
    inColumn++;
    i++;
  }

  if (inColumn >= symbolsToWin) {
    return true;
  }

  ////// IN DIAGONAL right-down-left
  let inDiagonalRightDownLeft = 1;
  // check to the left down
  i = origin.column;
  j = origin.row;
  while (
    i > 0 &&
    j < boardSize - 1 &&
    symbol === getSymbol(getField(j + 1, i - 1))
  ) {
    inDiagonalRightDownLeft++;
    i--;
    j++;
  }

  // check right up
  i = origin.column;
  j = origin.row;
  while (
    i < boardSize - 1 &&
    j > 0 &&
    symbol === getSymbol(getField(j - 1, i + 1))
  ) {
    inDiagonalRightDownLeft++;
    i++;
    j--;
  }

  if (inDiagonalRightDownLeft >= symbolsToWin) {
    return true;
  }

  ////// IN DIAGONAL left-down-right
  let inDiagonalLeftDownRight = 1;
  // check right down
  i = origin.column;
  j = origin.row;
  while (
    i < boardSize - 1 &&
    j < boardSize - 1 &&
    symbol === getSymbol(getField(j + 1, i + 1))
  ) {
    inDiagonalLeftDownRight++;
    i++;
    j++;
  }

  // check left up
  i = origin.column;
  j = origin.row;
  while (i > 0 && j > 0 && symbol === getSymbol(getField(j - 1, i - 1))) {
    inDiagonalLeftDownRight++;
    i--;
    j--;
  }

  if (inDiagonalLeftDownRight >= symbolsToWin) {
    return true;
  }
  return false;
};

// start game
play();

// draw game grid
window.addEventListener('load', () => {
  for (let i = 0; i < 100; i++) {
    let buttonEl = `
      <button class="game__btn"></button>
      `;
    gameEl.insertAdjacentHTML('afterbegin', buttonEl);
  }
});

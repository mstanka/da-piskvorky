'use strict';

const gameEl = document.querySelector('.game');
const btnEl = document.querySelector('.game__btn');
const iconEl = document.querySelector('.icon');
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
    changePlayer();
  });
};

// get symbol 
const getSymbol = (btnEl) => {
  if (btnEl.classList.contains('game__btn--circle')) {
    return 'circle';
  } else if (btnEl.classList.contains('game__btn--cross')) {
    return 'cross';
  } else {
    return undefined;
  }
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

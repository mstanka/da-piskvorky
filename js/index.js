'use strict';

const gameBtns = document.querySelectorAll('.game__btn');
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
const fillBtn = (i, item) => {
  gameBtns[i].classList.add(`game__btn--${item}`);
  gameBtns[i].setAttribute('disabled', true);
};

// loop the NodeList of buttons and listen for click
for (let i = 0; i < gameBtns.length; i++) {
  gameBtns[i].addEventListener('click', () => {
    if (player === 'circle') {
      fillBtn(i, 'circle');
    }
    if (player === 'cross') {
      fillBtn(i, 'cross');
    }
    changePlayer();
  });
}

/////////////////////////////
/// create 100x button element
/// when I use 'document.querySelectorAll('.game__btn')' I get NodeList length = 0, and cannot target the button

// const gameEl = document.querySelector('.game');

// const addButtons = () => {
//   for (let i = 0; i < 100; i++) {
//     const buttonEl = `
//       <button class="game__btn"></button>
//       `;
//     gameEl.insertAdjacentHTML('afterbegin', buttonEl);
//   }
// };

// window.addEventListener('load', addButtons);

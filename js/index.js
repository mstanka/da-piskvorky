'use strict';

/// create 100x button element
const gameEl = document.querySelector('.game');

const addButtons = () => {
  for (let i = 0; i < 100; i++) {
    const buttonEl = `
      <button class="game__btn"></button>
      `;
    gameEl.insertAdjacentHTML('afterbegin', buttonEl);
  }
};

window.addEventListener('load', addButtons);

const cards = [
  '🐶', '🐶',
  '🐱', '🐱',
  '🐭', '🐭',
  '🐹', '🐹',
  '🐰', '🐰',
  '🦊', '🦊',
  '🐻', '🐻',
  '🐼', '🐼'
];

let firstCard = null;
let secondCard = null;
let lockBoard = false;

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function createBoard() {
  const gameBoard = document.querySelector('.game-board');
  shuffle(cards);
  cards.forEach(card => {
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');
    cardElement.dataset.icon = card;
    cardElement.addEventListener('click', flipCard);
    cardElement.textContent = ''; // Pastikan kosong saat awal
    gameBoard.appendChild(cardElement);
  });
}

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flipped');
  this.textContent = this.dataset.icon;

  if (!firstCard) {
    firstCard = this;
    return;
  }

  secondCard = this;
  checkForMatch();
}

function checkForMatch() {
  if (firstCard.dataset.icon === secondCard.dataset.icon) {
    disableCards();
  } else {
    unFlipCards();
  }
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  resetBoard();
}

function unFlipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove('flipped');
    secondCard.classList.remove('flipped');
    firstCard.textContent = '';
    secondCard.textContent = '';
    resetBoard();
  }, 1000);
}

function resetBoard() {
  [firstCard, secondCard, lockBoard] = [null, null, false];
}

document.addEventListener('DOMContentLoaded', () => {
  createBoard();
  document.getElementById('reset-button').addEventListener('click', () => {
    const gameBoard = document.querySelector('.game-board');
    gameBoard.innerHTML = '';
    createBoard();
  });
});
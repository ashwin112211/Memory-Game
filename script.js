const symbols = ['🍎', '🍌', '🍇', '🍉', '🍓', '🍒', '🍍', '🥝'];
let cards = [...symbols, ...symbols]; // Duplicate for pairs
let flippedCards = [];
let matchedCards = [];
const board = document.getElementById('gameBoard');
const message = document.getElementById('message');

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function createBoard() {
  board.innerHTML = '';
  shuffle(cards).forEach((symbol, index) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.symbol = symbol;
    card.dataset.index = index;
    card.addEventListener('click', handleCardClick);
    board.appendChild(card);
  });
  message.textContent = '';
}

function handleCardClick(e) {
  const clicked = e.target;
  if (
    clicked.classList.contains('flipped') ||
    clicked.classList.contains('matched') ||
    flippedCards.length === 2
  ) return;

  clicked.textContent = clicked.dataset.symbol;
  clicked.classList.add('flipped');
  flippedCards.push(clicked);

  if (flippedCards.length === 2) {
    checkForMatch();
  }
}

function checkForMatch() {
  const [card1, card2] = flippedCards;
  if (card1.dataset.symbol === card2.dataset.symbol) {
    card1.classList.add('matched');
    card2.classList.add('matched');
    matchedCards.push(card1, card2);
    flippedCards = [];
    if (matchedCards.length === cards.length) {
      message.textContent = '🎉 You won!';
    }
  } else {
    setTimeout(() => {
      card1.textContent = '';
      card2.textContent = '';
      card1.classList.remove('flipped');
      card2.classList.remove('flipped');
      flippedCards = [];
    }, 1000);
  }
}

function restartGame() {
  flippedCards = [];
  matchedCards = [];
  createBoard();
}

createBoard();

const cards = [
    '🐶', '🐶', 
    '🐱', '🐱',
    '🐰', '🐰',
    '🐻', '🐻',
    '🐼', '🐼',
    '🦊', '🦊',
    '🐷', '🐷',
    '🐸', '🐸',
    '🐵', '🐵'
];

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let stepCount = 0;

// Функція для перемішування карт
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Функція для створення дошки
function createBoard() {
    const gameBoard = document.querySelector('.game-board');
    gameBoard.innerHTML = '';
    const pairCount = parseInt(document.getElementById('pair-count').value);

    // Використовуємо тільки обрану кількість пар
    const selectedCards = cards.slice(0, pairCount * 2);
    shuffle(selectedCards);

    selectedCards.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.icon = card;
        cardElement.addEventListener('click', flipCard);
        gameBoard.appendChild(cardElement);
    });
}

// Функція для перевороту картки
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

// Функція для перевірки на збіг
function checkForMatch() {
    stepCount++;
    document.getElementById('step-counter').textContent = `Кроки: ${stepCount}`;

    if (firstCard.dataset.icon === secondCard.dataset.icon) {
        disableCards();
    } else {
        unflipCards();
    }
}

// Функція для деактивації карт
function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
}

// Функція для перевертання карт назад
function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        firstCard.textContent = '';
        secondCard.textContent = '';
        resetBoard();
    }, 1000);
}

// Функція для скидання дошки
function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}

// Подія для кнопки скидання
document.getElementById('reset-button').addEventListener('click', () => {
    createBoard();
    stepCount = 0;
    document.getElementById('step-counter').textContent = `Кроки: ${stepCount}`;
});

// Ініціалізація гри
createBoard();
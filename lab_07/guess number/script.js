let balance = 100; // Початковий баланс
const costPerGame = 20; // Вартість одного раунду
const rewards = [40, 20, 10]; // Нагороди за вгадування з 1-ї, 2-ї та 3-ї спроб

// Функція для управління балансом (оновлення балансу та перевірка на достатність коштів)
function updateBalance(amount) {
    balance += amount;
    alert("Your current balance is $" + balance);

    if (balance < costPerGame) {
        alert("Insufficient balance to continue playing. Your final balance is $" + balance);
        return false; // Недостатньо коштів для продовження гри
    }
    return true; // Достатньо коштів для продовження гри
}

// Основна функція для початку гри
function startGame() {
    while (balance >= costPerGame) { // Гра продовжується, поки баланс більше або дорівнює $20
        if (confirm("Do you want to start a new game for $20? Your current balance is $" + balance)) {
            if (updateBalance(-costPerGame)) { // Знімаємо $20 з балансу
                playGame(); // Починаємо раунд гри
            } else {
                break; // Завершення гри, якщо недостатньо коштів
            }
        } else {
            alert("You chose to end the game. Your final balance is $" + balance);
            break; // Виходимо з циклу, якщо гравець натиснув "відміну"
        }
    }
}

// Функція для проведення одного раунду гри
function playGame() {
    const randomNumber = Math.floor(Math.random() * 5) + 1; // Загадуємо випадкове число від 1 до 5
    let guessedCorrectly = false; // Змінна для відстеження вгадування числа

    // Три спроби для гравця
    for (let attempt = 1; attempt <= 3; attempt++) {
        let userGuess = prompt(`Attempt ${attempt}: Guess the number (between 1 and 5)`); // Запит здогадки

        // Перевіряємо, чи правильно гравець вгадав число
        if (parseInt(userGuess) === randomNumber) {
            alert(`Congratulations! You guessed the number correctly on attempt ${attempt}`);
            updateBalance(rewards[attempt - 1]); // Додаємо винагороду до балансу
            guessedCorrectly = true; // Гравець вгадав правильно
            break; // Виходимо з циклу, оскільки гравець вгадав
        } else {
            alert(`Wrong guess! You have ${3 - attempt} attempt(s) left.`);
        }
    }

    // Якщо гравець не вгадав за 3 спроби, повідомляємо про це
    if (!guessedCorrectly) {
        alert("Sorry, you lost! The correct number was " + randomNumber);
    }

    updateBalance(0); // Оновлюємо баланс після гри (лише для відображення)
}

// Початок гри
startGame();
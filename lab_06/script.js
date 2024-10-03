// Функція для запуску калькулятора
function calculator() {
    // Запитуємо перше число
    let num1 = parseFloat(prompt("Введіть перше число:"));
    
    // Запитуємо операцію (+, -, *, /)
    let operator = prompt("Введіть операцію (+, -, *, /):");
    
    // Запитуємо друге число
    let num2 = parseFloat(prompt("Введіть друге число:"));
    
    // Змінна для результату
    let result;
    
    // Виконання операції на основі введеного оператора
    switch(operator) {
        case '+':
            result = num1 + num2;
            break;
        case '-':
            result = num1 - num2;
            break;
        case '*':
            result = num1 * num2;
            break;
        case '/':
            if (num2 !== 0) {
                result = num1 / num2;
            } else {
                alert("Помилка: на нуль ділити не можна!");
                return; // Завершуємо виконання функції, якщо ділення на нуль
            }
            break;
        default:
            alert("Невірний оператор!");
            return; // Завершуємо функцію, якщо оператор не підтримується
    }
    
    // Виводимо результат через alert
    alert(`Результат: ${num1} ${operator} ${num2} = ${result}`);
}

// Викликаємо функцію калькулятора
calculator(
);
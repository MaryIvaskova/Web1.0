// Імітація бази даних
let users = JSON.parse(localStorage.getItem("users")) || [];
let loggedInUser = null;

// Перехід між формами
function showRegister() {
    document.getElementById("registrationForm").style.display = "block";
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("userContainer").style.display = "none";
}

function showLogin() {
    document.getElementById("registrationForm").style.display = "none";
    document.getElementById("loginForm").style.display = "block";
    document.getElementById("userContainer").style.display = "none";
}

function showUsers() {
    document.getElementById("registrationForm").style.display = "none";
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("userContainer").style.display = "block";
    loadUsers();
}

// Реєстрація
function registerUser() {
    const username = document.getElementById("regUsername").value;
    const email = document.getElementById("regEmail").value;
    const password = document.getElementById("regPassword").value;

    if (users.some(user => user.username === username)) {
        alert("Username already exists!");
        return;
    }

    users.push({ username, email, password });
    localStorage.setItem("users", JSON.stringify(users));
    alert("Registration successful! You can now log in.");
    showLogin();
}

// Логін
function loginUser() {
    const username = document.getElementById("loginUsername").value;
    const password = document.getElementById("loginPassword").value;

    const user = users.find(user => user.username === username && user.password === password);
    if (!user) {
        alert("Invalid credentials!");
        return;
    }

    loggedInUser = user;
    localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
    alert(`Welcome, ${loggedInUser.username}!`);
    showUsers();
}

// Завантаження користувачів
function loadUsers() {
    const container = document.getElementById("userContainer");
    container.innerHTML = "<h1>All Users</h1>"; // Очищення

    users.forEach(user => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
            <h1>${user.username}</h1>
            <p>Email: ${user.email}</p>
        `;
        container.appendChild(card);
    });
}

// Перевірка авторизації
window.onload = function () {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    if (user) {
        loggedInUser = user;
        showUsers();
    } else {
        showLogin();
    }
};
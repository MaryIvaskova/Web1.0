const pokeContent = document.getElementById('pokemonContent');
const filterContainer = document.getElementById('filterContainer');
const paginationContainer = document.getElementById('pagination');

let allPokemonData = [];
let filteredData = [];
let currentPage = 1;
const itemsPerPage = 21;
let currentTypeFilter = 'all';

const pokemonTypes = ['all', 'fire', 'grass', 'electric', 'water', 'ground', 'rock', 'poison', 'bug', 'dragon', 'psychic', 'flying', 'fighting', 'normal'];

// Ініціалізуємо фільтри та завантажуємо базу покемонів
initFilters();
fetchAllPokemon().then(() => displayPage(filteredData));

function initFilters() {
    filterContainer.innerHTML = '';
    pokemonTypes.forEach(type => {
        const button = document.createElement('button');
        button.classList.add('filter-button');
        button.innerText = type.charAt(0).toUpperCase() + type.slice(1);
        button.addEventListener('click', () => filterPokemon(type));
        filterContainer.appendChild(button);
    });
}

async function fetchAllPokemon() {
    const cachedData = localStorage.getItem('pokemonData');
    if (cachedData) {
        allPokemonData = JSON.parse(cachedData);
    } else {
        for (let i = 1; i <= 898; i++) {
            const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
            const res = await fetch(url);
            const pokemon = await res.json();
            allPokemonData.push(pokemon);
        }
        localStorage.setItem('pokemonData', JSON.stringify(allPokemonData));
    }
    filterPokemon('all');  // Завантажуємо всі покемони за замовчуванням
}

function filterPokemon(type) {
    currentTypeFilter = type;
    filteredData = type === 'all' ? allPokemonData : allPokemonData.filter(pokemon => pokemon.types.some(t => t.type.name === type));
    currentPage = 1;  // Перехід на першу сторінку після зміни фільтру
    displayPage(filteredData);
}

function displayPage(pokemonData) {
    pokeContent.innerHTML = '';
    const start = (currentPage - 1) * itemsPerPage;
    const end = currentPage * itemsPerPage;
    const pageData = pokemonData.slice(start, end);
    pageData.forEach(pokemon => createPokemonCard(pokemon));
    renderPaginationButtons(pokemonData.length);
}

function renderPaginationButtons(totalItems) {
    paginationContainer.innerHTML = '';
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    if (currentPage > 1) {
        const prevButton = document.createElement('button');
        prevButton.textContent = '← Попередня';
        prevButton.addEventListener('click', () => {
            currentPage--;
            displayPage(filteredData);
        });
        paginationContainer.appendChild(prevButton);
    }

    if (currentPage < totalPages) {
        const nextButton = document.createElement('button');
        nextButton.textContent = 'Наступна →';
        nextButton.addEventListener('click', () => {
            currentPage++;
            displayPage(filteredData);
        });
        paginationContainer.appendChild(nextButton);
    }
}

function createPokemonCard(pokemon) {
    const pokemonEl = document.createElement('div');
    pokemonEl.classList.add('pokemon');
    const mainType = pokemon.types[0].type.name;

    const pokeInnerHTML = `
        <div class="img-container">
            <img loading="lazy" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png" alt="${pokemon.name}">
        </div>
        <div class="info">
            <span class="number">#${pokemon.id.toString().padStart(3, '0')}</span>
            <h3 class="name">${pokemon.name}</h3>
            <small class="type">Тип: <span>${mainType}</span></small>
        </div>
    `;
    pokemonEl.innerHTML = pokeInnerHTML;
    pokemonEl.addEventListener('click', () => openModal(pokemon));
    pokeContent.appendChild(pokemonEl);
}

// Відкриття та закриття модального вікна
function openModal(pokemon) {
    const modal = document.createElement('div');
    modal.classList.add('modal');
    modal.id = 'pokemon-modal';

    const modalHTML = `
        <div class="pokemon-detail">
            <h2>${pokemon.name}</h2>
            <button onclick="closeModal()" class="close-btn">Закрити</button>
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png" alt="${pokemon.name}">
            <div class="tabs">
                <button class="tab-button active" onclick="showTab(event, 'about')">Про покемона</button>
                <button class="tab-button" onclick="showTab(event, 'stats')">Статистика</button>
            </div>
            <div id="about" class="tab-content active">
                <p><strong>Тип:</strong> ${pokemon.types.map(type => type.type.name).join(', ')}</p>
                <p><strong>Зріст:</strong> ${pokemon.height / 10} м</p>
                <p><strong>Вага:</strong> ${pokemon.weight / 10} кг</p>
            </div>
            <div id="stats" class="tab-content">
                <div id="stats-container"></div>
            </div>
        </div>
    `;
    modal.innerHTML = modalHTML;
    document.body.appendChild(modal);
    displayStats(pokemon);
}

function closeModal() {
    const modal = document.getElementById('pokemon-modal');
    if (modal) {
        document.body.removeChild(modal);
    }
}

function showTab(event, tabName) {
    const buttons = document.querySelectorAll('.tab-button');
    const tabs = document.querySelectorAll('.tab-content');
    buttons.forEach(button => button.classList.remove('active'));
    tabs.forEach(tab => tab.classList.remove('active'));

    event.target.classList.add('active');
    document.getElementById(tabName).classList.add('active');
}

function displayStats(pokemon) {
    const statsContainer = document.getElementById('stats-container');
    statsContainer.innerHTML = '';
    pokemon.stats.forEach(stat => {
        const statItem = document.createElement('div');
        statItem.classList.add('stat-item');
        statItem.innerHTML = `
            <span>${stat.stat.name.toUpperCase()}: ${stat.base_stat}</span>
            <div class="progress-bar">
                <div class="progress" style="width: ${stat.base_stat / 2}%;"></div>
            </div>
        `;
        statsContainer.appendChild(statItem);
    });
}
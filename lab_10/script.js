// Зберігати об'єкти у localStorage
function loadObjects() {
    const storedObjects = localStorage.getItem('objectData');
    return storedObjects ? JSON.parse(storedObjects) : [];
}

function saveObjects() {
    localStorage.setItem('objectData', JSON.stringify(objectData));
}

// Ініціалізувати масив об'єктів
let objectData = loadObjects().length > 0 ? loadObjects() : [
    {
        name: "Дерев'яні пазли Вовк DP2",
        image_url: "https://img.brushme.com.ua/assets/images/products/40552/2ee9a71535ac3a20850a6b7a25c56e696704e2c2.jpg",
        description: ["Дерев'яні пазли Brushme - нове хобі для продуктивного відпочинку"],
        attributes: ["Набір художніх пазлів", "Екологічний мішечок для зберігання"]
    },
    {
        name: "Дерев'яні пазли Дхарма дракон DP5",
        image_url: "https://img.brushme.com.ua/assets/images/products/40555/600x600/d5c5984621bf9e12a13c76ddd78e91cb8f5640cc.jpg",
        description: ["Дерев'яні пазли Brushme - нове хобі для продуктивного відпочинку"],
        attributes: ["Набір художніх пазлів", "Екологічний мішечок для зберігання"]
    },
    {
        name: "Дерев'яні пазли Котик повстанець ©Маріанна Пащук'яні",
        image_url: "https://img.brushme.com.ua/assets/images/products/43389/600x600/8be985a3896a4557dd4ce9a85464965012017dad.jpg",
        description: ["Дерев'яні пазли Brushme - нове хобі для продуктивного відпочинку"],
        attributes: ["Набір художніх пазлів", "Екологічний мішечок для зберігання"]
    }
];

// Функція для відображення об'єктів у сітці
function displayObjects() {
    const grid = document.getElementById('object-grid');
    grid.innerHTML = ''; // Очистити сітку

    objectData.forEach((object, index) => {
        const objectElement = document.createElement('div');
        objectElement.classList.add('object');
        objectElement.innerHTML = `
            <img src="${object.image_url}" alt="${object.name}">
            <h3>${object.name}</h3>
            <button class="delete-button">Видалити</button>
        `;
        objectElement.querySelector('.delete-button').addEventListener('click', (e) => {
            e.stopPropagation(); // Зупинити подію, щоб не активувати click на об'єкті
            deleteObject(index);
        });
        objectElement.addEventListener('click', () => {
            displayObjectDetails(index);
        });
        grid.appendChild(objectElement);
    });
}

// Функція для відображення деталей об'єкта
function displayObjectDetails(index) {
    const selectedObject = objectData[index];
    document.getElementById('detail-name').textContent = selectedObject.name;
    document.getElementById('detail-image').src = selectedObject.image_url;
    document.getElementById('detail-description').innerHTML = selectedObject.description.map(desc => `<li>${desc}</li>`).join('');
    
    const attributesList = document.getElementById('detail-attributes');
    attributesList.innerHTML = '';
    selectedObject.attributes.forEach(attribute => {
        const li = document.createElement('li');
        li.textContent = attribute;
        attributesList.appendChild(li);
    });

    document.getElementById('object-grid').classList.add('hidden');
    document.getElementById('add-object-form').classList.add('hidden');
    document.getElementById('object-details').classList.remove('hidden');
}

// Функція для видалення об'єкта
function deleteObject(index) {
    objectData.splice(index, 1); // Видалити об'єкт з масиву
    saveObjects(); // Зберегти зміни в localStorage
    displayObjects(); // Оновити сітку
}

// Додати новий об'єкт
document.getElementById('add-object-button').addEventListener('click', () => {
    document.getElementById('add-object-form').classList.toggle('hidden');
});

document.getElementById('submit-object').addEventListener('click', () => {
    const name = document.getElementById('name').value;
    const image_url = document.getElementById('image_url').value;

    // Встановлюємо фіксовані значення для опису та атрибутів
    const description = ["Дерев'яні пазли Brushme - нове хобі для продуктивного відпочинку"];
    const attributes = ["Набір художніх пазлів", "Екологічний мішечок для зберігання"];

    const newObject = {
        name,
        image_url,
        description,
        attributes
    };

    objectData.push(newObject); // Додати об'єкт до масиву
    saveObjects(); // Зберегти об'єкт в localStorage
    displayObjects(); // Оновити сітку
    document.getElementById('add-object-form').classList.add('hidden'); // Сховати форму
});

// Повернення до сітки з деталей об'єкта
document.getElementById('back-to-grid').addEventListener('click', () => {
    document.getElementById('object-details').classList.add('hidden');
    document.getElementById('object-grid').classList.remove('hidden');
});

// Ініціалізація
displayObjects();
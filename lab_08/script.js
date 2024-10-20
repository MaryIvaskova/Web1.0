// Структура папок і файлів
const folderStructure = [
    {
        "Films": [
            "Iron Man.avi",       // Файл в папці "Films"
            {
                "Fantasy": [       // Папка "Fantasy" всередині "Films"
                    "The Lord of the Rings.avi",   // Файл в папці "Fantasy"
                    {
                        "New folder 1": []   // Порожня папка
                    }
                ]
            }
        ]
    },
    {
        "Documents": []   // Порожня папка "Documents"
    }
];

// Функція для створення дерева папок
function createFolderTree(structure, parent) {
    const ul = document.createElement('ul'); // Створюємо новий елемент списку
    
    structure.forEach(item => { 
        // Якщо це файл (рядок)
        if (typeof item == 'string') {
            const li = document.createElement('li');  // Створюємо новий пункт списку
            li.classList.add('file');                 //  клас для стилізації файлу
            li.textContent = item;                    //  назву файлу
            ul.appendChild(li);                       //  файл до списку
        } else {
            // Якщо це папка (об'єкт)
            for (const key in item) {
                const li = document.createElement('li');  //  пункт списку для папки
                li.classList.add('folder', 'closed');     //  класи для папки
                li.textContent = key;                     //  назву папки
                const sublist = createFolderTree(item[key], li); // Створюємо підсписок
                sublist.classList.add('hidden');          // - підсписок спочатку
                li.appendChild(sublist);                  //  підсписок до папки
                ul.appendChild(li);                       //  папку до списку
                
                // Додаємо подію для відкриття/закриття папки
                li.addEventListener('click', function (event) {
                    sublist.classList.toggle('hidden');   // Відкриваємо/закриваємо папку
                    li.classList.toggle('open');         // Змінюємо клас на відкриту
                    li.classList.toggle('closed');       // Змінюємо клас на закриту
                    event.stopPropagation();             // Зупиняємо сплив події
                });
            }
        }
    });

    parent.appendChild(ul); // Додаємо список до батьківського елемента
    return ul;              // Повертаємо створений список
}

// Знаходимо контейнер для відображення структури папок
const fileExplorer = document.getElementById('file-explorer');
// Створюємо дерево папок і файлів
createFolderTree(folderStructure, fileExplorer);
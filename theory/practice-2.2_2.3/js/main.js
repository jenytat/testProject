let postsData = []; // Храним оригинальные данные
let currentSort = { column: null, order: 'asc' }; // Текущая сортировка

// Функция для загрузки данных
async function fetchAndDisplayPosts() {
    const url = 'https://jsonplaceholder.typicode.com/posts';
    const container = document.getElementById('table-container');

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Ошибка при загрузке данных');
        }

        postsData = await response.json();
        displayTable(postsData);
    } catch (error) {
        container.textContent = 'Ошибка: ' + error.message;
    }
}

// Функция для отображения таблицы
function displayTable(data) {
    const container = document.getElementById('table-container');
    container.innerHTML = ''; // Очищаем контейнер
    const table = document.createElement('table');

    // Заголовки таблицы
    const headerRow = document.createElement('tr');
    const headers = [
        { text: 'User ID', key: 'userId' },
        { text: 'Post ID', key: 'id' },
        { text: 'Title', key: 'title' },
        { text: 'Body', key: 'body' },
    ];

    headers.forEach(header => {
        const th = document.createElement('th');
        th.textContent = header.text;

        // Добавляем сортировку только к столбцам userId и id
        if (header.key === 'userId' || header.key === 'id') {
            th.addEventListener('click', () => sortTable(header.key));
            if (currentSort.column === header.key) {
                th.classList.add(currentSort.order === 'asc' ? 'up' : 'down');
            }
        }
        headerRow.appendChild(th);
    });
    table.appendChild(headerRow);

    // Заполняем строки таблицы данными
    data.forEach(post => {
        const row = document.createElement('tr');
        const cells = [post.userId, post.id, post.title, post.body];
        cells.forEach(cellText => {
            const td = document.createElement('td');
            td.textContent = cellText;
            row.appendChild(td);
        });
        table.appendChild(row);
    });

    container.appendChild(table);
}

// Функция сортировки
function sortTable(column) {
    if (currentSort.column === column) {
        currentSort.order = currentSort.order === 'asc' ? 'desc' : 'asc';
    } else {
        currentSort.column = column;
        currentSort.order = 'asc';
    }

    const sortedData = [...postsData].sort((a, b) => {
        if (currentSort.order === 'asc') {
            return a[column] > b[column] ? 1 : -1;
        } else {
            return a[column] < b[column] ? 1 : -1;
        }
    });

    displayTable(sortedData);
}

// Функция для фильтрации данных
function filterTable(event) {
    const query = event.target.value.toLowerCase();

    if (query.length >= 3) {
        const filteredData = postsData.filter(post =>
            post.title.toLowerCase().includes(query) ||
            post.body.toLowerCase().includes(query)
        );
        displayTable(filteredData);
    } else if (query.length === 0) {
        displayTable(postsData);
    }
}

// Подключение обработчика поиска
document.getElementById('search-input').addEventListener('input', filterTable);

// Загружаем данные при старте
fetchAndDisplayPosts();
// Находим элементы для вывода информации о книге
const myBookTitle = document.getElementById("my-book-title");
const myBookAuthor = document.getElementById("my-book-author");
const myBookYear = document.getElementById("my-book-year");

// GET-запрос на сервер для получения данных о книге
fetch("https://alexh73.github.io/my-favorite-book/book.json")
  .then((res) => res.json())
  .then((book) => {
    // Деструктурируем нужные поля из объекта
    const { title, author, year } = book;

    // Создаём элементы
    const titleStrong = document.createElement("strong"); // для названия книги
    const authorU = document.createElement("u"); // для автора (подчёркнутый)
    const yearI = document.createElement("i"); // для года (курсив)

    // Записываем текст в созданные элементы
    titleStrong.textContent += title;
    authorU.textContent += author;
    yearI.textContent += year;

    // Добавляем элементы на странице
    myBookTitle.appendChild(titleStrong);
    myBookAuthor.appendChild(authorU);
    myBookYear.appendChild(yearI);
  });

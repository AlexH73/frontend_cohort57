// * 1. находим интерактивные элементы и кладем в переменные
const form = document.querySelector("#form-book");
const ul = document.querySelector("#list-book");

// массив под список книг
const bookList = [
  { book: "Гарри Поттер", author: "Джоан Роулинг" },
  { book: "Сто лет одиночества", author: "Габриэль Гарсиа Маркес" },
  { book: "Тихий Дон", author: "Михаил Шолохов" },
  { book: "451 градус по Фаренгейту", author: "Рэй Брэдбери" },
  { book: "Мастер и Маргарита", author: "Михаил Булгаков" },
];

// функция для перевода первой буквы каждого слова в заглавную
function toUpper(str) {
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word[0].toUpperCase() + word.substr(1))
    .join(" ");
}

// функция для рендера списка книг
function renderList() {
  ul.innerHTML = "";
  bookList.forEach((el) => {
    const li = document.createElement("li");
    li.textContent = `"${el.book}" от ${el.author}`;
    li.addEventListener("click", (event) => {
      event.target.classList.toggle("done");
    });
    ul.append(li);
  });
}

// первый рендер при загрузке страницы
renderList();

// обработка события формы
form.addEventListener("submit", (event) => {
  event.preventDefault();

  // забираем данные из input, причесываем регистр
  const book = {
    book: event.target.book.value.replace(/^[^a-zа-яё]*([a-zа-яё])/i, (m) =>
      m.toUpperCase()
    ),
    author: toUpper(event.target.author.value),
  };

  // чистим input
  event.target.book.value = "";
  event.target.author.value = "";

  // проверка на дубликаты
  const check = bookList.find(
    (el) => el.author === book.author && el.book === book.book
  );

  if (check) {
    alert("Эта книга уже в списке! 🙅‍♂️");
  } else {
    bookList.push(book);
    renderList();
  }
});

//чистим список
const clearBtn = document.getElementById("clear-btn");

clearBtn.addEventListener("click", () => {
  bookList.length = 0;
  renderList();
});

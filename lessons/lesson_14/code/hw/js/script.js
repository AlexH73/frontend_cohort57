const form = document.getElementById("add-book-form");
const booksList = document.getElementById("books-list");
const clearBtn = document.getElementById("clear-list");

let books = [];

function renderBooks() {
  while (booksList.firstChild) {
    booksList.removeChild(booksList.firstChild);
  }
  books.forEach((b) => {
    const li = document.createElement("li"); // <li></li>
    li.textContent = `"${b.title}" by ${b.author}`; // <li>"Lord" by Tolkien</li>
    booksList.appendChild(li);
  });
}

function clearBooks() {
  books = [];
  renderBooks();
}

function hasBook(book) {
  return books.some(
    (b) =>
      b.title.toLowerCase() === book.title.toLowerCase() &&
      b.author.toLowerCase() === book.author.toLowerCase()
  );
}

function handleSubmit(event) {
  event.preventDefault();
  console.log(event.target.author.value);
  console.log(event.target.title.value);

  const newBook = {
    author: event.target.author.value.trim(),
    title: event.target.title.value.trim(),
  };

  if (hasBook(newBook)) {
    alert("Error: Book with this title and author already exists");
  } else {
    books.push(newBook);
    event.target.title.value = "";
    event.target.author.value = "";
  }
  console.log(books);

  renderBooks();
}

form.addEventListener("submit", handleSubmit);
clearBtn.addEventListener("click", clearBooks);

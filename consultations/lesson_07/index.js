// находим интерактивные элементы и кладем в переменные
const form = document.querySelector("#form");
const ul = document.querySelector("#persons-list");
const input = document.querySelectorAll(".input");
const clearBtn = document.querySelector("#clear");
const clearOneBtn = document.querySelector("#clear-one");

// массив под список персон
const personList = [];

// функция для перевода первой буквы каждого слова в заглавную
function toUpper(str) {
  return str
    .toLowerCase()
    .split(" ")
    .filter(Boolean)
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
}

// обнуляем placeholder при клике в поле и возвращаем при клике в другое место
input.forEach((inp) => {
  const savePlaceholder = inp.getAttribute("placeholder");
  inp.addEventListener("focus", function () {
    inp.setAttribute("placeholder", " ");
  });
  inp.addEventListener("blur", function () {
    inp.setAttribute("placeholder", savePlaceholder);
  });
});

// обработка события формы
form.addEventListener("submit", (event) => {
  event.preventDefault();

  // забираем данные из input, причесываем регистр
  const placeRaw = event.target.place.value.trim();
  const nicknameRaw = event.target.nickname.value.trim();

  // Проверка на пустую строку
  if (!placeRaw || !nicknameRaw) {
    alert("Поля не должны быть пустыми!");
    return;
  }

  const person = {
    place: placeRaw.replace(/^[^a-zа-яё]*([a-zа-яё])/i, (m) => m.toUpperCase()),
    nickname: toUpper(nicknameRaw),
  };

  // чистим input
  event.target.place.value = "";
  event.target.nickname.value = "";

  // проверка на дубликаты
  const check = personList.find(
    (el) =>
      el.nickname.toLowerCase() === person.nickname.toLowerCase() &&
      el.place.toLowerCase() === person.place.toLowerCase()
  );

  if (check) {
    alert(
      `Место: ${person.place}, Ник: ${person.nickname}` +
        "\nЭтот человек уже в списке! 🙅‍♂️"
    );
  } else {
    personList.push(person);
    renderList();
  }
});

// формируем и выводим список элементов
function renderList() {
  ul.innerHTML = "";
  personList.forEach((person) => {
    const li = document.createElement("li");
    li.textContent = `Место: ${person.place}, Ник: ${person.nickname}`;
    li.onclick = changeStatus;
    ul.appendChild(li);
  });
}

// меняем стили по клику на элемент
function changeStatus(event) {
  if (event.target.style.textDecoration === "line-through") {
    event.target.style.textDecoration = "none";
  } else {
    event.target.style.textDecoration = "line-through";
  }
}

// чистим только верхнюю персону
clearOneBtn.addEventListener("click", () => {
  personList.shift();
  renderList();
});

//чистим весь список
clearBtn.addEventListener("click", () => {
  personList.length = 0;
  renderList();
});

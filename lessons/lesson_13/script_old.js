// * 1. находим интерактивные элементы и кладем в переменные

const form = document.querySelector("#form-todo");
const ul = document.querySelector("#list-todo");

// * 2. объявление функций

// * 3. вызов функций

// * 4. дальнейшие операции с кодом + работа со слушателями событий

// обрабатываем событие событие формы
form.addEventListener("submit", (event) => {
  // убираем перезагрузку формы по умолчанию
  event.preventDefault();

  // забираем данные из input уточняя name
  let task = {
    where: event.target.where.value,
    what: event.target.what.value,
  };

  // чистим input от введенных значений
  event.target.where.value = "";
  event.target.what.value = "";

  const li = document.createElement("li");
  li.textContent = `Задача: ${task.what}, место: ${task.where}`;
  ul.append(li);

  console.log(task);
});

// li.addEventListener('click', (event) => {
//   if (event.target.style.textDecoration === 'line-through') {
//     event.target.style.textDecoration = 'none'
//   } else {
//      event.target.style.textDecoration = 'line-through'
//   }
// })

// * 1. находим интерактивные элементы и кладем в переменные

const form = document.querySelector("#form-todo");
const ul = document.querySelector("#list-todo");

// массив под список задач
const taskList = [];

// * 2. дальнейшие операции с кодом + работа со слушателями событий

// обрабатываем событие событие формы
form.addEventListener("submit", (event) => {
  // убираем перезагрузку формы по умолчанию
  event.preventDefault();

  // забираем данные из input уточняя name
  let task = {
    where: event.target.where.value.toLowerCase(),
    what: event.target.what.value.toLowerCase(),
  };

  // чистим input от введенных значений
  event.target.where.value = "";
  event.target.what.value = "";

  // делаем проверку есть ли элемент в массиве
  const check = taskList.find(
    (el) => el.what === task.what && el.where === task.where
  );

  // если идентичный элемент найден - вызываем ошибку
  if (check) {
    alert("This is already in task list 🙅‍♂️");
  } else {
    // добавляем задачу в массив
    taskList.push(task);
    // создаем элемент
    const li = document.createElement("li");

    // добавляем обработчик с переключателем класса
    // от него будут зависеть стили элемента
    li.addEventListener("click", (event) => {
      if (event.target.className === "done") {
        event.target.className = "";
      } else {
        event.target.className = "done";
      }
    });

    // добавляем текст
    li.textContent = `Задача: ${task.what}, место: ${task.where}`;
    // добавляем элемент
    ul.append(li);
  }
  //  console.log(taskList);
});

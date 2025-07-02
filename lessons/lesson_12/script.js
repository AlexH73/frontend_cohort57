// ! DOM
// методы работы с глобальным объектом document
// * этот объект содержит всю информацию об элементах и их свойствах на странице

// console.dir(document) // тут в объекта находится ВСЕ что на странице есть

//*  можно в ручную находить сво-ва этого объекта и изменять их но это не удобно 🫣
// console.dir(document.body.children[0].textContent)
// console.dir(document.body.children[1].children[1].textContent)

// ! DOM methods

// чтобы удобно взаимодействовать с html элементами
// нам нужно уметь их находить и изменять
// для этого у нас есть методы поиска

const btnPlus = document.querySelector("#btn-plus");
const btnMinus = document.querySelector("#btn-minus");
const counterValue = document.querySelector("#counter");

// ! counter

let counter = 0;

// присваиваем новое значение для данных на странице
btnPlus.textContent = "плюс";
btnMinus.textContent = "минус";

const handlePlus = () => {
  // увеличиваем counter на 1
  counter++;
  // меняем текст на значение переменной
  counterValue.textContent = counter;
};

const handleMinus = () => {
  counter--;
  counterValue.textContent = counter;
};

// создаем слушатель события для кнопки
// это способ сделать элемент интерактивным

btnPlus.addEventListener("click", handlePlus);
btnMinus.addEventListener("click", handleMinus);

// handlePlus();
// handlePlus();

// ! DOM practice

const heading = document.querySelector("h1");
const btnCreate = document.querySelector(".btn-create");

// подробная информация о найденном элементе
/// console.dir(heading)

heading.addEventListener("click", () => {
  heading.textContent = "Функции и DOM";
  heading.className = "heading";
  // создаем новый элемент
  const p = document.createElement("p");
  // добавляем элементу текст
  p.textContent = "Этот элемент мы добавили через метод createElement()";
  console.log(p);
  // добавили элемент на страницу
  document.body.append(p);
});

btnCreate.addEventListener("click", () => {
  const img = document.createElement("img");
  img.src = "../../assets/lesson_12/image/DOM-Tree1.webp";
  document.body.append(img);
});

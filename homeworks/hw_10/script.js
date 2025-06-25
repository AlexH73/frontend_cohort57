//====== Задание 1 ======//
const names = ["Семен", "Иван", "Петр", "Татьяна"]; // создание массива с именами
const ages = [18, 27, 74, 34]; // создание массива с возрастами

const persons = []; // новый массив для персон

// * вариант решения циклом for
// итерация с наполнением нового массива
for (let i = 0; i < names.length; i++) {
  persons.push(`${names[i]} ${ages[i]} лет/годов`);
}

// * вариант решения циклом while
const persons1 = [];
let p = 0;

while (persons1.length != names.length) {
  persons1.push(`${names[p]} ${ages[p]} лет/годов`);
  p++;
}

//====== Задание 2 ======//
const personsReversed = []; // новый массив для персон reversed

// * вариант решения циклом for
// перебор с наполнением массива
for (let i = persons.length - 1; i >= 0; i--) {
  personsReversed.push(persons[i]);
}

// * вариант решения циклом while
const personsReversed2 = [];
let j = persons.length;

while (persons.length != personsReversed2.length) {
  personsReversed2.push(persons[j - 1]);
  j--;
}

//====== Задание 3 ======//
const fruits = []; // создаем пустой массив fruits

// наполняем его фруктами
fruits.push("Яблоко");
fruits.push("Банан");
fruits.push("Апельсин");

// изменяем массив, кладем удаленный элемент в переменную or
let or = fruits.pop();

// кладем элемент в начало массива
fruits.unshift(or);

//====== Задание 4 ======//
const vegis = ["Морковь", "Помидор"]; // новый массив с овощами

//в массив fruitsAndVeggies объединяем массивы fruits и vegis с добавлением новой строки
const fruitsAndVeggies = [...fruits, ...vegis, "Огурец"];

// деструктуризируем массив fruitsAndVeggies
const [orange, apple, banana, carrot, tomato, cucumber] = fruitsAndVeggies;

// выводим массив fruitsAndVeggies
console.log(fruitsAndVeggies);

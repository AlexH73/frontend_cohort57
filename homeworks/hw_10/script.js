//====== Задание 1 ======//
const names = ["Семен", "Иван", "Петр", "Татьяна"]; // создание массива с именами
const ages = [18, 27, 74, 34]; // создание массива с возрастами

const persons = []; // новый массив для персон

// итерация с наполнением нового массива
for (let i = 0; i < names.length; i++) {
  persons.push(`${names[i]} ${ages[i]} лет/годов`);
}

//====== Задание 2 ======//
const personsReversed = []; // новый массив для персон reversed

// перебор с наполнением массива
for (let i = persons.length - 1; i >= 0; i--) {
  personsReversed.push(persons[i]);
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
//в массив fruitsAndVeggies объединяем массив fruits с новыми строками
const fruitsAndVeggies = [...fruits, "Морковь", "Помидор", "Огурец"];

// деструктуризируем массив fruitsAndVeggies
const [orange, apple, banana, carrot, tomato, cucumber] = fruitsAndVeggies;

// выводим массив fruitsAndVeggies
console.log(fruitsAndVeggies);

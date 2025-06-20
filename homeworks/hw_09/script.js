// Задание 1
// 1.
let myNumber = 100 / (25 % 3);
console.log(myNumber); // деление числа 100 на остаток от деления 25 на 3

// 2.
let myString = "Hello, " + "world" + "! " + 2024;
console.log(myString); // конкатенация строк с добавлением числа 2024

// 3.
let isHuman = 42 == "42";
console.log(isHuman); // сравнение числа 42 со строкой "42", результат будет true, так как нестрогое сравнение

// 4.
myNumber = Number("123smth");
console.log(myNumber); // преобразование строки "123smth" в число, результат будет NaN

// ! Дополнительные упражнения

//? Задание 1

// 1.
let age = 18;
let hasPassport = true;

// 2.
let canTravel =
  age >= 18 && hasPassport
    ? "Вы можете путешествовать ✈️"
    : "Путешествие невозможно ❌"; // проверка, что возраст больше или равен 18 и есть паспорт

// 3.
console.log(canTravel); // вывод результата проверки

//? Задание 2

// 1.
let inputString = "500€";

// 2.
let price = parseInt(inputString); // преобразование строки "500€" в число, результат будет 500

// 3.
console.log(price + "$"); // вывод преобразованного числа

//? Задание 3

// 1.
let randomNumber = Math.floor(Math.random() * 50) + 1; // генерация случайного числа от 1 до 50

// 2.
console.log(randomNumber); // вывод случайного числа

// 3.
isEven = randomNumber % 2 === 0 ? "Число четное" : "Число нечетное"; // проверка, четное ли число

// 4.
console.log(isEven); // вывод результата проверки четности числа

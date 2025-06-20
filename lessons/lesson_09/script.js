console.log("Hello, JS!");

// Объявление переменных

let hello;
hello = "Привет, JavaScript 👨‍💼";
console.log(hello);

hello = "И привет всем языкам программирования!🛠";
console.log(hello);

const language = "JavaScript";
// language = 'Python' // Нельзя переприсвоить константу

// ! Примитивные типы данных в js

// * 1 string - строка
// "Earth", 'Earth', `Earth`
// три валидных способа для указания строк

let planet = "Earth";

let greeting = "We are from planet " + planet;

console.log(greeting);

let planetNumber = 3;

// Шаблонные строки это аналог конкатинации
// пишется в косых кавычках (backtiks)
let greeting1 = `Мы живем на планете ${planet}. Это ${planetNumber} планета от солнца`;

console.log(greeting1);

// * 2. number - числа

let n1 = 42;
let n2 = 3.14;
let n3 = -40;

let lastSafeInteger = Number.MAX_SAFE_INTEGER;
console.log(lastSafeInteger);

// * 3 boolean - булевое значение

let isStudent = true;
let isBackend = false;

// пример тернарного оператора - компактного условия
let whatToDo = isStudent ? "выполняй задания и учись" : "не хочешь по учиться?";

console.log(whatToDo);

// * 4 undefined - неопределенное значение
// не явное указание не отсутсвие

let objct; // здесь будет undefined

// * 5 null - нулевое значение
// явное указание на отсутствие значения

let user = null;

// * 6 bigint - большое число
// для операций с числами больше чем Number. MAX_SAFE_INTEGER

let bigNumber = 1000n;
let bigResult = bigNumber + 2000n;

console.log(bigResult);

// * 7. symbol - символ (не для Frontend)
// уникальное значение используемое в объектах

let symbolId = Symbol(10)

console.log(symbolId);

// ! операции над данными в js

// ? приведение типов

// переобразование в строки

// не явное при сложении
// становится строкой
let sum = 14 + 2 + '2'

console.log(sum);

// явное (рекомендуется)
let sum1 = String(42) + " - ответ на главный вопрос"

console.log(sum1);

// * преобразование в число

// не явное при вычитании
// становится числом 🫣
let sum0 = 14 + 2 - "2";

console.log(sum0)

// явное (рекомендуется)
let sum2 = 2 + Number('18')

console.log(sum2);

let sum31 = 42 + Number('100€')

console.log(sum31);

// явное (умеет отбрасывать ненужные символы)
let sum32 = 42 + parseInt("100€");

console.log(sum32);


// * преобразование в булевое значиние
// значения для falce в js

// falce
// 0
// undefined
// null
// ""
// NaN
// -0
// 0n

// остальные считаются истенными (true)


// ! Математические операторы

let b1 = 12 + 45; // сложение
let b2 = 122 - 45; // вычитание
let b3 = 5 * 5; // умножение
let b4 = 50 / 5; // деление
let b5 = 3 ** 3; // возведение в степень
let b6 = Math.sqrt(25); // квадратный корень
let b7 = 15 % 2; // остаток от деление

// * случайное число от 1 до 0
let random = Math.random();

// * случайное число от 1 до 100
// округляем до целых чисел с Math.floor
let random1 = Math.floor(Math.random() * 100) + 1;

// ! операторы сравнения

// >, <, >=, <=, ===, ==, !, !==, &&, ||

// * == - равенство с приведением типов
// console.log(99 == '99') - true

// * === - строгое равенство (рекомендуется)
// console.log(99 === '99') - false

const r1 = 25 !== "25"; // true
const r2 = !true; // false

const a = 0;
const b = 30;

const res = (a > 0 && b < 20) || a === 0;

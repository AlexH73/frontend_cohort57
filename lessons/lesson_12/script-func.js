// ! functions
// функции позволяют переиспользовать написанный код
// помогают организовывать и структурировать код

// * function declaration
// объявление функции
// это план действий, что должно произойти,
// если функция будет вызвана

// function greeting() {
//   console.log("Hello!")
// }

// * value - это параметр функции
function greeting(value) {
  return "Hello, " + value + "!";
}

// * вызов функции - только так код в функции сработает
// заместо value в круглых скобках мы передаем желаемое значение
let alex = greeting("Alex");
let dace = greeting("Dace");

console.log(greeting("Владимир"));

console.log(alex);
console.log(dace);

// если у функции нет возвращенного значения - она возвращает undefined

// * arrow functions - стрелочные функции
// короткая запись функции
// названием функции - будет название переменной, куда мы кладем стрелочную функцию

// ! короткая стрелочная функция в одну строчку автоматический возвращает значение после "=>"

const sum = (a, b) => a + b;

const result = sum(13, 44);
const result1 = sum("Привет, ", "студенты!");

console.log(result);
console.log(result1);

// ! если требуется несколько строчек - мы пишем фигурные скобки и нам нужен return

const multiply = (a, b, c) => {
  const res = a * b * c;
  return "Результат умножения: " + res;
};

console.log(multiply(8, 10, 2));

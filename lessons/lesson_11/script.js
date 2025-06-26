// ! объекты

// пример объявления объекта
const frodo = {
  name: "Frodo",
  age: 30,
  race: "hobbit",
  hasMagic: false,
  height: 60,
};

// * обращение к значению по ключу
// console.log(frodo.name);

// * перезаписываем значение по ключу
frodo.hasMagic = true;

// console.log(frodo)

// ! методы массивов II (примеры с объектами)

const brothers = [
  { name: "Gandalf", height: 160, hasMagic: true, race: "maia", age: 2500 },
  { name: "Legolas", height: 170, hasMagic: true, race: "elf", age: 900 },
  { name: "Frodo", height: 60, hasMagic: false, race: "hobbit", age: 30 },
  { name: "Saruman", height: 155, hasMagic: true, race: "maia", age: 2000 },
  { name: "Aragorn", height: 160, hasMagic: false, race: "human", age: 120 },
  { name: "Sam", height: 63, hasMagic: false, race: "hobbit", age: 32 },
];

// ! map()
// не мутирующий
// итерируется по всем элементам исходного массива
// с каждым элементом можно произвести желаемую операцию
// создает новый массив (под него нужно создать переменную)
// ! длинна нового массива всегда равна длине исходного

// * пример 1
// за место el на каждой итерации приходит следующий элемент массива
// ? const arr1 = brothers.map(el => console.log(el.name))

// в этом пример в новом массиве будет массив из undefined - потому что после '=>' нет возвращенного значения

// * пример 2
// hero или el - это название переменной которе мы придумываем сами - как обращаться к элементам итерируемого массива
const arr2 = brothers.map((el) => el.name + " is " + el.race);

// console.log(arr1)
// console.log(arr2)
// console.log(brothers)

// * массив из имен - самый простой пример
const ages = brothers.map((el) => el.age);

const namesAndAges = brothers.map((x) => x.name + ": " + x.age);

// console.log(namesAndAges)

// * пример 3
// нам не обязательно создавать новый массив
// мы можем использовать метод map() как процедуру,
// которая производит изменения с другими элементами

const arr3 = [];

const arr4 = brothers.map((el) => arr3.push(el.name));

// console.log(arr3) // массив из имен которые добавляли на каждой итерации
// console.log(arr4) // массив из возвращенных значений изменяющейся длинны arr3

// ! filter()
// не мутирующий
// создает новый массив на основе предыдущего
// в него войдут только те элементы, которые удовлетворяют условию после '=>'
// ! метод всегда возвращает массив (если элементов удовлетворяющих условию не найдено - возвращает пустой массив)

const brothers1 = brothers.filter((el) => el.hasMagic === true);

const brothers2 = brothers.filter(
  (el) => el.hasMagic === false && el.height > 60
);

const brothers3 = brothers.filter((el) => el.race === "alien"); // здесь будет пустой массив

// ! find()
// не мутирующий
// возвращает первый элемент удовлетворяющий условию после '=>'
// если элемент не найден - возвращает undefined

const brother1 = brothers.find((el) => el.name === "Saruman");
// console.log(brother1);

// ! slice()
// не мутирующий
// возвращает измененный массив
// из исходного мы вырезаем ту часть которая нам нужна

// принимает два аргумента:
// 1й - c какого индекса (включительно)
// * 2й (не обязательный) - до какого индекса (не включительно) ⚠️
// если передавать один - это будет значит 'до самого конца'

const shortBrothers = brothers.slice(1, 4);

// console.log(brothers)
// console.log(shortBrothers)

const lastBrothers = brothers.slice(-2); // оставит два элемента с конца

// console.log(lastBrothers)

// ! splice()
// мутирующий
// удаляет элементы из исходного массива

// принимает два аргумента:
// 1й - c какого индекса удаляет (включительно)
// * 2й (не обязательный) - кол-во удаляемых элементов ⚠️
// если передавать один - это будет значит 'удаляем до самого конца'

namesAndAges.splice(1, 3); // удалит 3 элемента начиная с того что с индексом 1

// console.log(namesAndAges)



// ! sort()
// мутирующий метод
// метод сортировки
// по умолчанию работает как сортировка строк
// для того чтобы отсортировать числа по порядку - нужна функция сортировки

const brothersNames = brothers.map(el => el.name)

brothersNames.sort() // ! сортировка строк

const brothersAges = brothers.map(el => el.age)

brothersAges.sort((a, b) => a - b) // ! сортировка чисел

brothers.sort((a, b) => a.name.localeCompare(b.name)) // ! сортировка объектов в массивах


// ! reduce()
// поочередно выполняет операции с элементами (el) производя вычисления с аккумулируемым значением (acc)

// 1. 1й аргумент функция с действием
// 2. 2й - начальное значение для acc
// возвращает значение

const sumOfAges = brothersAges.reduce((acc , el) => acc + el, 0)

const sumOfNames = brothersNames.reduce((acc , el) => acc + 'этот ' + el + ', ', 'Герои: ')

console.log(sumOfNames)

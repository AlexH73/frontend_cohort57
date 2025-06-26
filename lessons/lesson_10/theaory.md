## **Массивы (Arrays)**

### Что такое массив:

Массив — это тип данных, который позволяет хранить упорядоченный список элементов. Чаще всего используется для хранения однотипных данных, но может содержать элементы разных типов.

```js
const arr1 = new Array(); // менее предпочтительный способ
const arr2 = []; // предпочтительный способ
```

### Примеры массивов:

```js
const numbers = [4, 8, 15, 16, 23, 42];
const fruits = ["apple", "orange", "pear"];
const mixed = ["text", 123, true, null, [1, 2]];
```

### Доступ к элементам:

```js
const pear = fruits[2]; // доступ по индексу (начинается с 0)
const none = fruits[10]; // undefined — элемент не существует
```

### Длина массива:

```js
const length = fruits.length;
```

___

## **Циклы**

### Цикл `for`:

Подходит для перебора элементов массива.

```js
for (let i = 0; i < numbers.length; i++) {
  console.log(i + ": " + numbers[i]);
}
```

### Цикл `while`:

Выполняет блок кода, пока условие истинно.

```js
let i = 0;
while (i < 5) {
  console.log(i);
  i++;
}
```

___

## **Методы массивов**

### Изменяющие (мутирующие) методы:

-   **push(item)** — добавляет элемент в конец массива, возвращает новую длину.
-   **pop()** — удаляет последний элемент, возвращает его.
-   **unshift(item)** — добавляет элемент в начало, возвращает новую длину.
-   **shift()** — удаляет первый элемент, возвращает его.

```js
const animals = ["cat", "dog"];
animals.push("rabbit"); // ["cat", "dog", "rabbit"]
animals.pop();          // ["cat", "dog"]
animals.unshift("fox"); // ["fox", "cat", "dog"]
animals.shift();        // ["cat", "dog"]
```

___

## **Spread-синтаксис**

Используется для создания копий и объединения массивов.

```js
const newAnimals = [...animals];
const allItems = [...fruits, ...animals];
const withNew = ["new", ...animals, "end"];
```

___

## **Деструктуризация массива**

Позволяет извлекать значения из массива и присваивать их переменным.

```js
const cities = ["Hamburg", "Leipzig", "Berlin", "Hannover"];
const [hamburg, leipzig, , hannoverCity] = cities;
```

Можно пропустить элементы, оставив пустое место между запятыми.

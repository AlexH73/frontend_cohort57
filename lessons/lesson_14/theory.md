## ⏳ `setTimeout`

`setTimeout` вызывает функцию **один раз** через заданное количество миллисекунд.

```js
setTimeout(() => {
  console.log("Hey, timeout!");
}, 3000);

// Результат в консоли: "Hey, timeout!" спустя 3 секунды
```

___

## 🔁 `setInterval`

`setInterval` вызывает функцию **периодически**, через указанный интервал времени.

```js
const ourInterval = setInterval(() => {
  console.log("Буду появляться каждые 5 секунд");
}, 5000);

// Сообщение будет появляться в консоли каждые 5 секунд,
// пока не вызовем clearInterval
```

___

## 🛑 `clearInterval`

`clearInterval` останавливает выполнение, запущенное через `setInterval`.

```js
setTimeout(() => {
  clearInterval(ourInterval);
}, 10000);

// Прекратит повтор через 10 секунд
```

___

## ✅ `Promise`

**`Promise`** — объект, представляющий результат асинхронной операции.

### Состояния промиса:

-   `pending` (ожидание)
-   `fulfilled` (выполнен)
-   `rejected` (отклонён)

```js
let promise = new Promise(function (resolve, reject) {
  setTimeout(() => {
    resolve(5);
  }, 3000);
});
```

___

## `.then`

Метод `.then` используется для обработки успешного выполнения промиса.

```js
promise.then((value) => {
  console.log(value); // 5
});
```

___

## `.catch`

Метод `.catch` используется для обработки ошибок (отклонения промиса).

```js
let promise2 = new Promise(function (resolve, reject) {
  setTimeout(() => {
    reject(new Error("Ошибкааааа!!!!!"));
  }, 4000);
});

promise2.catch((err) => console.log(err));
```

___

## 📚 Полезные материалы

-   Статья про Event Loop: [JavaScript Visualized](https://dev.to/lydiahallie/javascript-visualized-event-loop-3dif)
-   Ещё статья про Event Loop: [Habr](https://habr.com/ru/articles/461401/)
-   Онлайн-визуализатор Event Loop: [Loupe](http://latentflip.com/loupe/?code=!!!PGJ1dHRvbj5DbGljayBtZSE8L2J1dHRvbj4%3D)
-   Теория Event Loop: [learn.javascript.ru](https://learn.javascript.ru/event-loop)
-   Архитектура браузера: [Ulbi TV](https://www.youtube.com/watch?v=zDlg64fsQow)
-   Теория Promises: [learn.javascript.ru](https://learn.javascript.ru/promise-basics)
-   Презентация по Promises: [PDF на GitHub](https://github.com/ait-tr/cohort24/blob/main/front_end/lesson_13/promise.pdf)

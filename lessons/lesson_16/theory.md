## ⚙ Что такое `async/await`?

`async/await` — это **синтаксический сахар** над промисами (Promises), который делает асинхронный код **более читаемым** и **похожим на синхронный**.

___

## 📌 Основы

### 1\. `async` перед функцией:

-   Делает функцию **асинхронной**.
-   Всегда возвращает **Promise**.

```js
async function getData() {
  return "Hello"; // фактически вернётся Promise, который resolve'ится в "Hello"
}
```

### 2\. `await` используется **только внутри `async`\-функции**:

-   Приостанавливает выполнение, пока промис не завершится (`resolved` или `rejected`).
-   Возвращает результат выполнения промиса.

```js
async function fetchData() {
  const response = await fetch("https://api.example.com/data");
  const data = await response.json();
  console.log(data);
}
```

___

## 🔄 Пример с обычным промисом и async/await

### 📉 Без `async/await` (на промисах):

```js
fetch("https://api.example.com/data")
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error(error));
```

### 📈 С `async/await`:

```js
async function loadData() {
  try {
    const response = await fetch("https://api.example.com/data");
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Ошибка:", error);
  }
}
```

___

## 📌 Важные моменты

| Особенность | Пояснение |
| --- | --- |
| `await` блокирует только текущую `async` функцию | Страница продолжит работать. |
| `try...catch` нужен для обработки ошибок | В отличие от `.catch()` у промисов. |
| Можно использовать `await` с любым объектом, у которого есть `.then()` | Не только с `Promise`. |

___

## ✅ Когда использовать `async/await`?

-   Когда нужно **последовательно** выполнить несколько асинхронных действий.
-   Для лучшей **читаемости** и **управления ошибками** по сравнению с `.then()`.

### **Навигация и управление страницей, методы `window`**

-   `window.open(url, name, specs)` — открыть новое окно или вкладку.
-   `window.close()` — закрыть текущее окно (если оно было открыто скриптом).
-   `window.location.href` — получить или установить текущий URL.
-   `window.location.reload()` — перезагрузить страницу.
-   `window.history.back()` — вернуться на предыдущую страницу.
-   `window.history.forward()` — перейти на следующую страницу.

___

## 📦 Что такое `localStorage`

`localStorage` — это встроенное хранилище браузера, позволяющее сохранять данные в виде пар **ключ–значение**. Данные сохраняются **постоянно** — даже после перезагрузки страницы или закрытия браузера.

___

## ✅ Основные методы `localStorage`

| Метод | Описание |
| --- | --- |
| `localStorage.setItem(key, value)` | Сохраняет значение по ключу (всегда как строку). |
| `localStorage.getItem(key)` | Получает значение по ключу. |
| `localStorage.removeItem(key)` | Удаляет значение по ключу. |
| `localStorage.clear()` | Очищает всё хранилище. |
| `localStorage.key(index)` | Получает ключ по индексу. |
| `localStorage.length` | Количество сохранённых элементов. |

___

## 📋 Пример использования `localStorage`

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Пример localStorage</title>
  </head>
  <body>
    <input type="text" id="nameInput" placeholder="Введите имя" />
    <button onclick="saveName()">Сохранить</button>
    <button onclick="showName()">Показать</button>
    <button onclick="clearName()">Очистить</button>

    <p id="result"></p>

    <script>
      function saveName() {
        const name = document.getElementById("nameInput").value;
        localStorage.setItem("userName", name);
        alert("Имя сохранено!");
      }

      function showName() {
        const name = localStorage.getItem("userName");
        document.getElementById("result").textContent = name
          ? `Привет, ${name}!`
          : "Имя не найдено.";
      }

      function clearName() {
        localStorage.removeItem("userName");
        document.getElementById("result").textContent = "";
      }
    </script>
  </body>
</html>
```

___

## 🔐 Особенности

-   `localStorage` хранит **только строки** — для объектов нужно использовать `JSON.stringify()` и `JSON.parse()`:

```js
// Сохранить объект
const user = { name: "Анна", age: 30 };
localStorage.setItem("user", JSON.stringify(user));

// Прочитать объект
const savedUser = JSON.parse(localStorage.getItem("user"));
console.log(savedUser.name); // "Анна"
```

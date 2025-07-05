
# DOM в JavaScript

**DOM (Document Object Model)** — это объектная модель HTML-документа. Когда браузер загружает веб-страницу, он превращает HTML в древовидную структуру объектов — **DOM-дерево**, где каждый HTML-элемент становится узлом (node), а тег — объектом, доступным через JavaScript.

---

## 🧠 Что такое DOM?

**DOM** — это интерфейс, предоставляемый браузером, позволяющий JavaScript взаимодействовать с HTML-документом.

С его помощью можно:

- читать и изменять содержимое страницы,
- добавлять или удалять элементы,
- обрабатывать события (например, клики),
- менять стили и классы элементов.

---

## 🧱 Пример DOM-дерева

Для кода:

```html
<html>
  <body>
    <h1>Привет, мир!</h1>
    <p>Это параграф.</p>
  </body>
</html>
```

DOM будет выглядеть примерно так:

```
document
└── html
    └── body
        ├── h1
        └── p
```

---

## 🔧 Часто используемые методы DOM в JavaScript

### 1. **Поиск элементов на странице**

| Метод | Описание |
| --- | --- |
| `document.getElementById(id)` | Ищет элемент по `id` |
| `document.getElementsByClassName(className)` | Возвращает коллекцию элементов с указанным классом |
| `document.getElementsByTagName(tagName)` | Возвращает коллекцию элементов по тегу |
| `document.querySelector(selector)` | Возвращает **первый** элемент по CSS-селектору |
| `document.querySelectorAll(selector)` | Возвращает **все** элементы по CSS-селектору |

**Примеры:**

```js
const title = document.getElementById("main-title");
const paragraphs = document.getElementsByTagName("p");
const firstButton = document.querySelector(".btn");
const allButtons = document.querySelectorAll(".btn");
```

---

### 2. **Изменение содержимого элементов**

| Метод/свойство | Описание |
| --- | --- |
| `element.textContent` | Получить или задать текст без HTML |
| `element.innerHTML` | Получить или задать HTML-содержимое |
| `element.innerText` | Как `textContent`, но учитывает стили и переносы строк |

**Пример:**

```js
const p = document.querySelector("p");
p.textContent = "Новый текст!";
```

---

### 3. **Изменение атрибутов**

| Метод/свойство | Описание |
| --- | --- |
| `element.getAttribute(attrName)` | Получает значение атрибута |
| `element.setAttribute(attrName, value)` | Устанавливает значение атрибута |
| `element.removeAttribute(attrName)` | Удаляет атрибут |
| `element.id`, `element.className`, `element.href` и др. | Быстрый доступ к атрибутам |

**Пример:**

```js
const link = document.querySelector("a");
link.setAttribute("href", "https://example.com");
link.setAttribute("target", "_blank");
```

---

### 4. **Работа с классами**

| Метод | Описание |
| --- | --- |
| `element.classList.add("class")` | Добавляет класс |
| `element.classList.remove("class")` | Удаляет класс |
| `element.classList.toggle("class")` | Включает/выключает класс |
| `element.classList.contains("class")` | Проверяет наличие класса |

**Пример:**

```js
const box = document.querySelector(".box");
box.classList.add("active");
box.classList.toggle("hidden");
```

---

### 5. **Создание и добавление элементов**

| Метод | Описание |
| --- | --- |
| `document.createElement(tagName)` | Создает новый элемент |
| `element.appendChild(child)` | Добавляет дочерний элемент |
| `element.append(...)` | Добавляет один или несколько элементов/строк |
| `element.prepend(...)` | Добавляет в начало |
| `element.remove()` | Удаляет элемент |
| `element.replaceWith(...)` | Заменяет текущий элемент |

**Пример:**

```js
const newDiv = document.createElement("div");
newDiv.textContent = "Привет!";
document.body.appendChild(newDiv);
```

---

### 6. **Обработка событий**

| Метод | Описание |
| --- | --- |
| `element.addEventListener(event, handler)` | Добавляет обработчик события |
| `element.removeEventListener(...)` | Удаляет обработчик |

**Пример:**

```js
const button = document.querySelector("button");

button.addEventListener("click", () => {
  alert("Кнопка нажата!");
});
```

---

## 📚 Пример на практике

```html
<button id="myBtn">Нажми меня</button>
<p id="output"></p>

<script>
  const btn = document.getElementById("myBtn");
  const output = document.getElementById("output");

  btn.addEventListener("click", () => {
    output.textContent = "Привет от JavaScript!";
    btn.classList.toggle("clicked");
  });
</script>
```

---

## ✅ Итого

**DOM** — это способ взаимодействия JavaScript с HTML-страницей.

Он позволяет:

- находить элементы,
- изменять их содержимое и стиль,
- добавлять и удалять узлы,
- реагировать на действия пользователя.

---

## 📌 Таблица-шпаргалка по DOM в JavaScript

| Категория | Метод / Свойство | Описание | Пример |
|----------|------------------|----------|--------|
| 🔍 Поиск элементов | `getElementById(id)` | Находит элемент по `id` | `document.getElementById("header")` |
| | `getElementsByClassName(class)` | Возвращает коллекцию по классу | `document.getElementsByClassName("box")` |
| | `getElementsByTagName(tag)` | Возвращает коллекцию по тегу | `document.getElementsByTagName("p")` |
| | `querySelector(sel)` | Первый элемент по CSS-селектору | `document.querySelector(".item")` |
| | `querySelectorAll(sel)` | Все элементы по CSS-селектору | `document.querySelectorAll("li.active")` |
| 📝 Работа с содержимым | `textContent` | Устанавливает / получает только текст | `el.textContent = "Текст"` |
| | `innerHTML` | Устанавливает / получает HTML | `el.innerHTML = "<b>Жирный</b>"` |
| | `innerText` | Как `textContent`, но с учётом CSS | `el.innerText = "Видимый текст"` |
| ⚙️ Атрибуты | `getAttribute(name)` | Получает значение атрибута | `el.getAttribute("href")` |
| | `setAttribute(name, value)` | Устанавливает значение атрибута | `el.setAttribute("id", "main")` |
| | `removeAttribute(name)` | Удаляет атрибут | `el.removeAttribute("disabled")` |
| 🎨 Классы | `classList.add(class)` | Добавляет класс | `el.classList.add("active")` |
| | `classList.remove(class)` | Удаляет класс | `el.classList.remove("hidden")` |
| | `classList.toggle(class)` | Вкл/выкл класс | `el.classList.toggle("open")` |
| | `classList.contains(class)` | Проверяет наличие класса | `el.classList.contains("btn")` |
| 🧱 Элементы | `createElement(tag)` | Создает новый элемент | `document.createElement("div")` |
| | `appendChild(node)` | Добавляет в конец | `el.appendChild(newDiv)` |
| | `append(...nodes)` | Добавляет строки/элементы | `el.append("Привет", newEl)` |
| | `prepend(...)` | Добавляет в начало | `el.prepend(newEl)` |
| | `remove()` | Удаляет элемент | `el.remove()` |
| | `replaceWith(...)` | Заменяет элемент | `el.replaceWith(newNode)` |
| ⚡ События | `addEventListener(event, fn)` | Назначает обработчик события | `btn.addEventListener("click", fn)` |
| | `removeEventListener(...)` | Удаляет обработчик | `el.removeEventListener("click", fn)` |

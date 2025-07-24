### 🔌 Как подключить Axios через CDN

Добавь следующий `<script>` тег в HTML-файл:

```html
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
```

После этого объект `axios` становится доступен глобально в браузере.

___

### 🛠 Примеры использования Axios

#### 1\. **GET-запрос**

```js
axios.get('https://jsonplaceholder.typicode.com/posts/1')
  .then(response => {
    console.log(response.data); // Данные из ответа
  })
  .catch(error => {
    console.error('Ошибка запроса:', error);
  });
```

#### 2\. **POST-запрос**

```js
axios.post('https://jsonplaceholder.typicode.com/posts', {
    title: 'Заголовок',
    body: 'Текст',
    userId: 1
  })
  .then(response => {
    console.log('Ответ на POST:', response.data);
  })
  .catch(error => {
    console.error('Ошибка при POST:', error);
  });
```

#### 3\. **Настройка заголовков (например, Authorization)**

```js
axios.get('/user', {
  headers: {
    'Authorization': 'Bearer ТВОЙ_ТОКЕН'
  }
});
```

___

### 🧠 Особенности

-   Axios автоматически преобразует JSON-ответ в JavaScript-объект.
-   Поддерживает `async/await`:

```js
async function fetchData() {
  try {
    const response = await axios.get('/api/data');
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}
```

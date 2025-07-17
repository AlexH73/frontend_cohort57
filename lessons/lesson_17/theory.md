### 🔹 1. **URL** (обязательный параметр)

Это адрес, куда отправляется запрос (строка или объект `Request`).

```js
fetch('https://api.example.com/data')
```

___

### 🔹 2. **Опции (options)** (необязательный второй аргумент)

Это объект, в котором можно указать метод запроса, заголовки, тело и другие параметры.

```js
fetch('https://api.example.com/data', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ name: 'John' })
})
```

___

### 📦 Состав объекта **options**:

| Параметр | Назначение | Пример |
| --- | --- | --- |
| `method` | HTTP-метод (`GET`, `POST`, `PUT`, `DELETE` и т. д.) | `'POST'` |
| `headers` | Заголовки запроса (объект или `Headers`) | `{ 'Content-Type': 'application/json' }` |
| `body` | Тело запроса (для `POST`, `PUT`, и т. д.) | `JSON.stringify(data)` |
| `mode` | CORS-настройка (`cors`, `no-cors`, `same-origin`) | `'cors'` |
| `credentials` | Отправлять ли куки (`omit`, `same-origin`, `include`) | `'include'` |
| `cache` | Настройка кэширования | `'no-cache'` |
| `redirect` | Поведение при редиректе (`follow`, `error`, `manual`) | `'follow'` |
| `referrer` | Указывает referrer или `'no-referrer'` | `'client'` |

___

### 🔄 Пример полного fetch-запроса:

```js
fetch('https://api.example.com/users', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer token123'
  },
  body: JSON.stringify({ username: 'admin', password: '1234' }),
  credentials: 'include'
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Ошибка:', error));
```

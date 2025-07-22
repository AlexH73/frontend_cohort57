Пример `DELETE`\-запроса с использованием `async/await` :

```js
// Асинхронная функция для удаления ресурса
async function deleteItem(itemId) {
  const url = `https://example.com/api/items/${itemId}`; // URL с ID удаляемого ресурса

  try {
    const response = await fetch(url, {
      method: 'DELETE', // Указываем метод DELETE
      headers: {
        'Content-Type': 'application/json',
        // Если требуется авторизация, добавьте токен:
        // 'Authorization': 'Bearer YOUR_TOKEN'
      }
    });

    if (!response.ok) {
      // Если ответ сервера — ошибка (не 2xx), выбрасываем исключение
      throw new Error(`Ошибка при удалении: ${response.status}`);
    }

    // Если сервер вернул JSON (можно пропустить, если тело не возвращается)
    const data = await response.json();

    console.log('Удаление успешно:', data);
  } catch (error) {
    // Обработка ошибок (сеть, сервер и т.д.)
    console.error('Произошла ошибка при удалении:', error.message);
  }
}

// Вызов функции
deleteItem(123); // Замените 123 на нужный ID
```

### Кратко:

-   `async/await` упрощает работу с асинхронным кодом, делая его более читаемым.
-   `fetch` — выполняет HTTP-запрос.
-   `await` ожидает завершения запроса.
-   `try...catch` — перехватывает возможные ошибки.

# Концепция многоязычного HTML-портала "FAQ по IT/Программированию" (RU/DE, светлая/тёмная тема)

## 1. Структура и навигация

- **Многостраничник**:
  - Главная страница: категории языков/технологий (Java, HTML, CSS, JavaScript, SQL и др.), быстрый поиск, переключатели темы и языка.
  - Для каждого языка — собственная подкатегория с вопросами и оглавлением.
  - Вопросы сгруппированы по темам: основы, ООП, коллекции, работа с DOM, запросы к БД и т.д.
- **Языки**:
  - RU (русский), DE (немецкий) — легко добавить EN, ES и др.
  - Переключение языка — всегда доступно.
- **Темы**:
  - Светлая/тёмная, возможно — высокая контрастность для слабовидящих.
- **Контент**:
  - Универсальные вопросы (алгоритмы, структуры данных) не привязаны к языку.
  - Для каждой технологии — специфика (например, работа с DOM для JS, flexbox для CSS и т.д.).

## 2. Главная страница

- Блоки-карточки: Java, HTML, CSS, JS, MySQL, Git, Алгоритмы и структуры данных, DevOps и др.
- Поиск по ключевым словам (автодополнение, фильтры по языку/уровню/типу вопроса).
- Список новых и популярных вопросов.
- Быстрые ссылки: "Изучаю основы", "Готовлюсь к собеседованию", "Frontend", "Backend", "Базы данных" и т.д.

## 3. Страница вопроса

- Категория/язык/уровень/тема.
- RU/DE переключатель.
- Краткий ответ и “Подробнее…” (раскрывающийся блок).
- Примеры кода/разметки для каждого языка.
- Таблицы, сравнения, лучшие практики.
- Быстрая навигация по разделам темы.
- Ссылки на внешние ресурсы, официальную документацию.

## 4. UI/UX детали

- Переключатель темы (светлая/тёмная).
- Поддержка мобильных устройств.
- Подсветка синтаксиса кода по языкам.
- Кнопка “скопировать код”.
- Оглавление (sidebar или drop-down).
- Быстрая фильтрация по уровню сложности.
- SEO и адаптация под печать.

## 5. Технологии

- Генерация: статический сайт (Astro, Hugo, Docusaurus, Next.js) или SPA (React/Vue).
- CSS: Tailwind, Bootstrap или кастомные стили.
- Система i18n для перевода.
- Хранение вопросов: Markdown-файлы с метаданными (язык, категория, уровень и т.д.).
- Возможность легко добавлять новые языки и темы.

## 6. Расширяемость

- Возможность добавлять:
  - Новые языки программирования и технологии.
  - Вопросы по алгоритмам, DevOps, тестированию, UI/UX, soft-skills.
  - Интерактивные тесты/квиз.
  - Ссылки на видеоматериалы, курсы, официальную документацию.
- Поддержка обратной связи/комментариев/лайков/закладок (на будущее).


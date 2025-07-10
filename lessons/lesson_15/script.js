const files = [
  "lessons/lesson_15/code/example_01/index.js",
  "lessons/lesson_15/code/example_01/pirate.json",
  "lessons/lesson_15/code/example_01/user.json",
  "lessons/lesson_15/code/example_02/index.js",
  "lessons/lesson_15/code/example_02/index.html",
  "lessons/lesson_15/code/example_03/index.js",
  "lessons/lesson_15/code/example_03/index.html",
  "lessons/lesson_15/code/hw/js/index.js",
];

// Группируем файлы по папкам
const groups = {};

files.forEach((file) => {
  // Получаем имя папки (example1, example2, example3, hw)
  const match = file.match(/code\/([^\/]+)\//);
  if (match) {
    const folder = match[1];
    if (!groups[folder]) groups[folder] = [];
    groups[folder].push(file);
  }
});

// Заголовки для папок
const titles = {
  example_01: "Пример 1:",
  example_02: "Пример 2:",
  example_03: "Пример 3:",
  hw: "Разбор домашки:",
};

const ul = document.getElementById("file-list");
ul.innerHTML = ""; // очищаем на всякий случай

Object.keys(groups).forEach((folder) => {
  // Добавляем заголовок
  const h2 = document.createElement("h2");
  h2.textContent = titles[folder] || folder;
  ul.appendChild(h2);

  // Добавляем список файлов
  const innerUl = document.createElement("ul");
  groups[folder].forEach((file) => {
    const li = document.createElement("li");
    // Формируем относительный путь для ссылки
    const relPath = file.replace(/^lessons\/lesson_15\//, "");
    const a = document.createElement("a");
    a.href = relPath;
    a.textContent = relPath;
    a.target = "_blank";
    li.appendChild(a);
    innerUl.appendChild(li);
  });
  ul.appendChild(innerUl);
});

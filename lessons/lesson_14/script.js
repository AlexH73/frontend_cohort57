const files = [
  "lessons/lesson_14/code/example1/index.js",
  "lessons/lesson_14/code/example2/index.js",
  "lessons/lesson_14/code/example3/index.js",
  "lessons/lesson_14/code/example4/index.js",
  "lessons/lesson_14/code/example4/index.html",
  "lessons/lesson_14/code/hw/js/script.js",
  "lessons/lesson_14/code/hw/index.html",
];

// Группируем файлы по папкам
const groups = {};

files.forEach((file) => {
  // Получаем имя папки (example1, example2, example3, example4, hw)
  const match = file.match(/code\/([^\/]+)\//);
  if (match) {
    const folder = match[1];
    if (!groups[folder]) groups[folder] = [];
    groups[folder].push(file);
  }
});

// Заголовки для папок
const titles = {
  example1: "Пример 1:",
  example2: "Пример 2:",
  example3: "Пример 3:",
  example4: "Пример 4:",
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
    const relPath = file.replace(/^lessons\/lesson_14\//, "");
    const a = document.createElement("a");
    a.href = relPath;
    a.textContent = relPath;
    a.target = "_blank";
    li.appendChild(a);
    innerUl.appendChild(li);
  });
  ul.appendChild(innerUl);
});

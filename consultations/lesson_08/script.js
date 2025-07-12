const files = [
  "consultations/lesson_08/theory.md",
  "consultations/lesson_08/promise.pdf",
  "consultations/lesson_08/async.png",
  "consultations/lesson_08/cat_app/index.html",
  "consultations/lesson_08/cat_app/index.js",
  "consultations/lesson_08/dog_app/index.html",
  "consultations/lesson_08/dog_app/index.js",
  "consultations/lesson_08/data_users/index.html",
  "consultations/lesson_08/data_users/index.js",
];

// Группируем файлы по папкам
const groups = {};

files.forEach((file) => {
  // Ищем подпапку
  const match = file.match(/lesson_08\/([^\/]+)\//);
  if (match) {
    const folder = match[1];
    if (!groups[folder]) groups[folder] = [];
    groups[folder].push(file);
  } else {
    // Файлы без подпапки кладём в отдельную группу
    if (!groups["lesson_08"]) groups["lesson_08"] = [];
    groups["lesson_08"].push(file);
  }
});

// Заголовки для папок
const titles = {
  cat_app: "Пример 1:",
  dog_app: "Пример 2:",
  data_users: "Пример 3:",
  lesson_08: "Файлы теории и презентации:",
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
    const relPath = file.replace(/^consultations\/lesson_08\//, "");
    const a = document.createElement("a");
    a.href = relPath;
    a.textContent = relPath;
    a.target = "_blank";
    li.appendChild(a);
    innerUl.appendChild(li);
  });
  ul.appendChild(innerUl);
});

// найдем первую кнопку по id
const btn = document.getElementById("magic-btn");
btn.style.cursor = "pointer";
// скопируем ее - получилась вторая кнопка. Ее можно использовать.
const clonedBtn = btn.cloneNode(true);
// задали id
clonedBtn.id = "magic-btn-2";
// меняем текст
clonedBtn.textContent = "Я изменю тебя";
// применяем новые стили
clonedBtn.style.backgroundColor = "#a78b71";
clonedBtn.style.color = "white";
clonedBtn.style.fontSize = "20px";
clonedBtn.style.margin = "20px";
clonedBtn.style.borderRadius = "10px";
clonedBtn.style.border = "none";
clonedBtn.style.padding = "15px";

btn.addEventListener("click", () => {
  // при нажатии на первую кнопку
  // работайте с clonedBtn
  // ваш код начинается здесь
  // Добавляем в body
  document.body.appendChild(clonedBtn);
});

// здесь можете создать EventListener для второй кнопки
clonedBtn.addEventListener("click", () => {
  btn.style.backgroundColor = "#9c4a1a";
  btn.style.color = "black";
});
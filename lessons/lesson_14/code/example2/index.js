const hopInterval = setInterval(() => {
  console.log("Hop!");
}, 3000);

setTimeout(() => {
  clearInterval(hopInterval); // остановит интервал через 20 секунд
}, 20000);

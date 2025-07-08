// создаем функцию, которая возвращает true с вероятностью 50%
function isGoodDay() {
  return Math.random() < 0.5;
}

// создаём промис
const yourDay = new Promise(function (res, rej) {
  if (isGoodDay()) {
    res("Best day of my life");
  } else {
    rej(new Error("Something is off"));
  }
});

// обрабатываем результат промиса
yourDay
  .then((good) => {
    console.log(good);
  })
  .catch((err) => {
    console.log(err);
  });

//console.log(yourDay);

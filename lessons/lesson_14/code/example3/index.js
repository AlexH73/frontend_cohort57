// Promise

// fullfilled
// rejected
// pending

function getRandom() {
  return Math.floor(Math.random() * 2); // возвращает 0 либо 1
}

const burgerPromise = new Promise(function (res, rej) {
  setTimeout(() => {
    if (getRandom()) {
      res("Burger");
    } else {
      rej(new Error("No bread!"));
    }
  }, 5000);
});

console.log(burgerPromise); // Promise { <pending> }

// setTimeout(() => {
//   console.log(burgerPromise);
// }, 6000);

// then - можем получить значение без таймера -> fullfilled
// catch - обработать ошибку - в случае reject -> rejected

// Раскрыть промис без сет таймаут
burgerPromise
  .then((burger) => {
    console.log(burger);
  })
  .catch((err) => {
    console.log(err);
  });

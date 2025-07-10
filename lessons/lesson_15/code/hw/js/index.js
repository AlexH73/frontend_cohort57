function random() {
    return Math.random() >= 0.5;
}


const dayMoto = new Promise(function (res, rej) {
  setTimeout(() => {
    if (random()) {
      res("Best day of my life");
    } else {
      rej("Something is off");
    }
  }, 1000);
});

// pending
// rejected
// fullfilled

dayMoto
.then((moto) => {
  console.log(moto);
})
.catch((err) => {
    console.log(err);
    
});
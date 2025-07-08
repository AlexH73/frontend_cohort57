let x = 12;
console.log(x);

x = 10;
console.log(x);

let myName;

// timers
setTimeout(() => {
  console.log("Hello 0 sec");
  myName = "Alex"
}, 0);

console.log(myName);

setTimeout(() => {
  console.log("Hello 3 sec");
  console.log("Name: " + myName);
}, 3000);

console.log("Hello, no timer");

// Напишите функцию lateHappyBirthday
// выводит фразу "Happy Birthday"
// через 6 секунд
// Сделайте вызов функции lateHappyBirthday

// После поздравления через 6 секунд - выведите Thank you


function lateHappyBirthday(arg) {
 setTimeout(() => {
   console.log(arg);
   thanks();
 }, 6000);
 
}

function thanks() {
    setTimeout(() => {
        console.log("Спасибо!");       
    }, 6000)
}

lateHappyBirthday("С днем рождения!")

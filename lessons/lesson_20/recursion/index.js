// рекурсия - вызов самой себя
// - условие выхода
// - шаг рекурсии

function recursivePrint(number) {
  console.log(number);
  if (number > 5) {
    recursivePrint(number - 1);
  }
}

// recursivePrint(8);
//   console.log(8);
//  8 > 5

// recursivePrint(7);
// console.log(7);
// 7 > 5

// ...

// recursivePrint(5);
// console.log(5);
// 5 > 5
// конец
recursivePrint(8); // 8 7 6 5

// let x = 10;
// while (x > 5) {
//   x -= 1;
//   console.log("hey");
// }

//1. 10 > 5
//   10 - 1 = 9
//   hey

//2. 9  > 5
//   9 - 1 = 8
//   hey

//.  5 > 5
// выходим из цикла

console.log("*******");

function recursivePrint2(number) {
  if (number > 5) {
    recursivePrint2(number - 1);
    console.log(number);
  }
}

// recursivePrint2(8);

if (8 > 5) {
  if (7 > 5) {
    if (6 > 5) {
      if (5 > 5) {
      }
      console.log(6);
    }
    console.log(7);
  }
  console.log(8);
}

// [
//   [1],
//   [
//     [1, 2],
//     [1, 2, 3, 5],
//   ],
// ];

// recursivePrint2(8);
// 49. 8 > 5
// 50  recursivePrint(7);
// 48  7 > 5

// 50  recursivePrint(6);
// 48  6 > 5

// 50  recursivePrint(5);
// 48  5 > 5

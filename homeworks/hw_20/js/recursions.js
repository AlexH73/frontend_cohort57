// A: От 1 до n
// Дано натуральное число n. Выведите все числа от 1 до n.
// Ввод 	Вывод
//  5     1 2 3 4 5

function recursivePrintA(n) {
  if (n >= 1) {
    recursivePrintA(n - 1);
    console.log(`A: ${n}`);
  }
}

recursivePrintA(5);

// B: От A до B
// Даны два целых числа A и В (каждое в отдельной строке). Выведите все числа от A до B включительно, в порядке возрастания, если A < B, или в порядке убывания в противном случае.
// Ввод 	Вывод
//  5      5 4 3 2 1
//  1

function recursivePrintB(a, b) {
  console.log(`B: ${a}`);
  if (a === b) {
    return;
  }
  if (a < b) {
    recursivePrintB(a + 1, b);
  } else {
    recursivePrintB(a - 1, b);
  }
}

recursivePrintB(5, 1); // выведет: 5 4 3 2 1
// recursivePrintB(1, 5); // выведет: 1 2 3 4 5

// C: Функция Аккермана
// В теории вычислимости важную роль играет функция Аккермана A(m,n), определенная следующим образом:

//         ⎧ n+1                   m=0
//  A(m,n)=  A(m−1,1)              m>0,n=0
//         ⎨ A(m−1,A(m,n−1))       m>0,n>0
//         ⎩
// Даны два целых неотрицательных числа m и n, каждое в отдельной строке. Выведите A(m,n).
// Ввод 	Вывод
// 2       7
// 2

function recursivePrintC(m, n) {
  if (m === 0) {
    return n + 1;
  } else if (m > 0 && n === 0) {
    return recursivePrintC(m - 1, 1);
  } else if (m > 0 && n > 0) {
    return recursivePrintC(m - 1, recursivePrintC(m, n - 1));
  }
}

console.log(`C: ${recursivePrintC(2, 2)}`); // выведет: 7

// D: Точная степень двойки
// Дано натуральное число N. Выведите слово YES, если число N является точной степенью двойки, или слово NO в противном случае.
// Операцией возведения в степень пользоваться нельзя!
// Ввод 	Вывод
//  8      YES
//  3      NO

let i = 0;
function recursivePrintD(n) {
  if (2 ** i < n) {
    i++;
    recursivePrintD(n);
  }

  if (2 ** i >= n) {
    if (2 ** i === n) {
      return "YES";
    } else {
      return "NO";
    }
  }
}

console.log(`D: ${recursivePrintD(8)}`); // выведет: YES
console.log(`D: ${recursivePrintD(3)}`); // выведет: NO

// E: Сумма цифр числа
// Дано натуральное число N. Вычислите сумму его цифр.
// При решении этой задачи нельзя использовать строки, списки, массивы (ну и циклы, разумеется).
// Ввод 	Вывод
// 179    17

function recursivePrintE(n) {
  if (n < 10) {
    return n;
  } else {
    return (n % 10) + recursivePrintE((n - (n % 10)) / 10);
  }
}

console.log(`E: ${recursivePrintE(179)}`); // выведет: 17


// F: Цифры числа справа налево
// Дано натуральное число N. Выведите все его цифры по одной, в обратном порядке, разделяя их пробелами или новыми строками.
// При решении этой задачи нельзя использовать строки, списки, массивы (ну и циклы, разумеется). Разрешена только рекурсия и целочисленная арифметика.
// Ввод 	Вывод
//  179  9 7 1

function recursivePrintF(n) {
  if (n < 10) {
    console.log(`F: ${n}`);
  } else {
    console.log(`F: ${(n % 10) + recursivePrintE(n)}`);
  }

}

recursivePrintF(179); // выведет: 9 7 1
recursivePrintF(456);



// Необходимо написать функцию которая преобразует полученный на вход массив -
// в строку, сворачивая соседние по числовому ряду числа в диапазон
//
// Вход: Массив чисел
// Выход: Строка с диапазонами

// Пример 1:
// Входные данные: [1,4,5,2,3,9,8,11,0]
// На выходе: 0-5,8-9,11
// range([1,4,5,2,3,9,8,11,0])// 0-5,8-9,11

// Пример 2:
// Входные данные: [1,4,2,3]
// На выходе: 1-4
// range([1,4,2,3]) // 1-4

const transformation = (array) => {
  const arr = [...new Set(array)]; // Убираем дубликаты
  arr.sort((a, b) => a - b); // Сортируем массив
  if (arr.length === 0) return "";

  let result = [];
  let i = 0;

  while (i < arr.length) {
    let start = arr[i];
    let end = arr[i];

    while (i + 1 < arr.length && arr[i] + 1 === arr[i + 1]) {
      end = arr[++i];
    }

    result.push(start !== end ? `${start}-${end}` : `${arr[i]}`);
    i++;
  }
  return result.join(",");
};

let arr = [1, 4, 2, 3];
console.log(transformation(arr));

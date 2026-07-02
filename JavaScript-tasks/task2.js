// Необходимо написать функцию которая получает все value из переданного в нее дерева

// Вход: Объект
// Выход: Строка значений разделенных запятой
// Пример 1:
// const object = {
//   value: 1,
//   children: [{
//       value: 2,
//       children: [{  value: 3  }],
//       },
//       {
//       value: 4,
//       children: [
//           { value: 5 },
//           { value: 6 }
//       ],
//   }]
// }
// Входные данные: object
// На выходе: 1,2,3,4,5,6
// getTreeValues(object)// 1,2,3,4,5,6

const tree = {
  value: 1,
  children: [
    {
      value: 2,
      children: [{ value: 3 }],
    },
    {
      value: 4,
      children: [
        { value: 5 },
        { value: 6, children: [{ value: 7 }, { value: 8 }] },
      ],
    },
  ],
};

const getTreeValues = (tree) => {
  const result = [];

  const transition = (obj) => {
    if (obj && typeof obj === "object" && "value" in obj) {
      const val = obj.value;
      if (val !== null && typeof val === "object") {
        Object.values(val).forEach((item) => result.push(item));
      } else {
        result.push(val);
      }
    }
    if (obj && Array.isArray(obj.children)) {
      obj.children.forEach((child) => transition(child));
    }
  };

  transition(tree);
  return result.join(",");
};

console.log(getTreeValues(tree));

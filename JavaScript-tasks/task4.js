// Приведение типов и ловушки JavaScript

// **Теория (30 секунд):**  
// В JS есть `==` (нестрогое сравнение) и `===` (строгое). `==` приводит типы, что ведёт к неожиданным результатам. Middle обязан знать все подводные камни и **никогда не использовать `==` без явной причины**.
// ### Задача `[Средне]` (на 1ч20м)

// > Напишите функцию `safeCompare`, которая принимает два значения любых типов и возвращает `true`, если они **глубоко равны** (содержимое объектов и массивов совпадает).
// > 
// > **Условия:**
// > 
// > 1. Функция должна корректно работать с:
// >     
// >     - примитивами (`string`, `number`, `boolean`, `null`, `undefined`, `NaN`);
// >         
// >     - объектами (включая вложенные);
// >         
// >     - массивами;
// >         
// >     - `Date` (сравнивать по времени);
// >         
// >     - регулярными выражениями (сравнивать по источнику и флагам);
// >         
// >     - функциями (сравнивать по строке кода).
// >         
// > 2. Должна обрабатывать **циклические ссылки** (чтобы не упасть в бесконечную рекурсию).
// >     
// > 3. Не использовать `JSON.stringify()` (это ловушка — он не работает с `Date`, `undefined`, функциями и циклическими ссылками).

// **Интерфейс:**

// ~~~
// safeCompare(1, 1); // true
// safeCompare(1, '1'); // false (строгое сравнение)
// safeCompare(NaN, NaN); // true (специальный случай)
// safeCompare({ a: 1 }, { a: 1 }); // true
// safeCompare([1, [2]], [1, [2]]); // true
// safeCompare(new Date(2020, 0, 1), new Date(2020, 0, 1)); // true
// safeCompare(/abc/i, /abc/i); // true

const safeCompare = (a, b, visited = new WeakMap()) => {
    // 1. Строгое сравнение
    if (a === b) return true;

    // 2. Проверка NaN
    if (Number.isNaN(a) && Number.isNaN(b)) return true;

    // 3. Проверка на null
    if (a === null || b === null) return false;

    const typeA = typeof a;
    const typeB = typeof b;

    // 4. Проверка типов
    if (typeA !== typeB) return false;

    // 5. Если типы одинаковые, проверяем на object
    if (typeA !== 'object' && typeB !== 'object') return false;

    // 6. Циклические ссылки (Проверка на бесконечные рекурсии)
    if (visited.has(a) || visited.has(b)){
        return visited.get(a) === b || visited.get(b) === a;
    }

    // Если ничего не нашли, запоминаем текущую пару
    visited.set(a, b);

    // 7. Проверка специальных объектов
    if (a instanceof Date && b instanceof Date){
        return a.getTime() === b.getTime();
    }

    if (a instanceof RegExp && b instanceof RegExp) {
        return a.source === b.source && a.flags === b.flags;
    }

    if (typeA === 'function' && typeB === 'function'){
        return a.toString() === b.toString();
    }

    // 8. Массивы
    if (Array.isArray(a) && Array.isArray(b)){
        // Если длина разная - false
        if (a.length !== b.length) return false;
        // Рекурсивно сравниваем каждый элемент
        for (let i = 0; i < a.length; i++){
            if (!safeCompare(a[i], b[i], visited)) return false;
        }
        return true;
    }

    if (Array.isArray(a) || Array.isArray(b)) return false;

    // 9. Обычные объекты
    const keysA = Object.keys(a);
    const keysB = Object.keys(b);

    // Если количество ключей разное - false
    if (keysA !== keysB) return false;

    // Перебираем ключи a
    for (const key of keysA){
        // Проверяем, если ли этот ключ у b через hasOwnPropety
        if (!Object.prototype.hasOwnProperty.call(b, key)) return false;
        // Рекурсивно сравниваем значения по ключу
        if (!safeCompare(a[key], b[key], visited)) return false;
    }

    return true;
}

console.log(safeCompare(1, 1)); // true
console.log(safeCompare(1, '1')); // false (строгое сравнение)
console.log(safeCompare(NaN, NaN)); // true (специальный случай)
console.log(safeCompare({ a: 1 }, { a: 1 })); // true
console.log(safeCompare([1, [2]], [1, [2]])); // true
console.log(safeCompare(new Date(2020, 0, 1), new Date(2020, 0, 1))); // true
console.log(safeCompare(/abc/i, /abc/i)); // true


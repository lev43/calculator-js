// Список из возможных операций
const actions = {
    '+': {f: (a, b) => a + b, c: 13},
    '-': {f: (a, b) => a - b, c: 13},
    '*': {f: (a, b) => a * b, c: 14},
    '/': {f: (a, b) => a / b, c: 14},
    '%': {f: (a, b) => a % b, c: 14},
    '!': {f: (a) => {let s = 0; for(let i = 0; i <= a; i++)s += i; return s}, c: 1},
    '&&': {f: (a, b) => a && b, c: 6},
    '||': {f: (a, b) => a || b, c: 5}
}

// Класс для скобок, просто ля удобства
class brackets {
    c = Infinity // Даем максимальное значение, что-бы всегда сначала выполнялись скобки
    name = "brackets"
    constructor(arr) {
        this.arr = arr.slice(1, arr.length - 1)
    }
    f() {return math(this.arr)}
}

//Функция, она просчитывает введенные данные
function math(input) {
    while(input.length > 1) {
        let action, max, maxi

        //Выбираем операцию которую надо выполнить первой
        for(let i = 0; i < input.length; i++){
            if(input[i].c > max || !max) {
                max = input[i].c
                maxi = i
            }
        }

        // Если нету операций, например, пользователь ввел "2 + + 2"
        if(!max)throw Error("Не корректный ввод!")

        action = input[maxi] // Получаем операцию из списка

        //Получаем данные для операции
        let args = [...input.slice(maxi - action.f.length / 2, maxi), ...input.slice(maxi + 1, maxi + action.f.length / 2 + 1)]

        // Все данные должны быть числами и их должно хватать для операции
        if(args.length != action.f.length || args.find(e => typeof e != 'number'))throw Error("Не корректный ввод!")

        //Подменяем данные и операцию на результат операции
        input.splice(maxi - action.f.length / 2, action.f.length + 1, action.f(...args))
    }
    if(typeof input[0] != 'number')throw Error("Ошибка")
    return input[0]
}

// Создаем интерфейс, что-бы читать данные из консоли
// Подгружаем при помощи require объект readline, из него достаем класс Interface и создаем объект
new require('readline').Interface({
    input: process.stdin, // Передаем входной поток
    output: process.stdout, // Передаем выхоной поток
    prompt: '' // Это знак в консоли, будет появлятся
// После чего, вешаем обработчик, что-бы получать введенные строки
}).on('line', line => {
    try {
        // Разбиваем строку на части которых мы затем обработаем
        line = line.match(/\d+\.?\d*|[^\s\d\(\)]+|[\(\)]/g)
        if(!line)throw Error("Пустой ввод")

        // Преобразуем строку в операции и числа
        let input = []
        line.forEach((e, i) => {
            if(isNaN(parseInt(e))) // Проверяем, если это нельзя преобразовать в число, значит, это операция или скобки
                if(actions[e]) input[i] = actions[e] // Если операци, достаем из списка объект операции
                else if(e == '(' || e == ')') input[i] = e // Тогда проверяем, может это скобки
                else throw Error(`Нету операции '${e}'`) // Иначе, ошибка
            else input[i] = parseFloat(e) // Если можно преобразовать в число, делаем это
        })

        //Дальше, преобразуем скобки в объекты brackets
        while(input.indexOf('(') != -1 || input.indexOf(')') != -1) { // Пока есть скобки, работает
            // Находим самую дальную открывающую скобку и самую ближнюю к ней закрывающую скобку
            l = input.lastIndexOf('('), r = input.indexOf(')', input.lastIndexOf('(')) + 1
            
            // Если нету пары из двух скобок, кидаем ошибку
            if(l == -1 || r == 0)throw Error(`Не хватает ${l == -1 ? "левой" : "правой"} скобки`)
        
            // Иначе, подменяем их и все что между ними на объект brackets
            // Мы запоминаем в объекте все что там было, затем мы выполним это в первую очередь
            input.splice(l, r - l, new brackets(input.slice(l, r)))
        }
        //Выводим результат
        console.log(`${line.join(' ')} = ${math(input)}`)
    } catch(err) {console.log(`${line ? line.join(' ') : ''}: ${err.message}`)}
})
console.log("Калькулятор запущен")                            
# Calculator-js (creating)
Данное руководство предназначенно для моих одногруппников по кружку.
## Содержание
- [Шаг #1][step1]
  - [Считывание данных][step1-1]
  - [Обработка данных #1][step1-2]
  - [Итоговый код][step1-end]

# Шаг #1
В данном шаге мы создадим простой калькулятор который станет основой


## Считывание данных
Первый делом, мы реализуем считывание данных из консоли.<br>
В NodeJS, в отличие от большинства языков, нету встроенной функции считывания консоли.
Но есть `readline`, который ее реализует.

При помощи `require` мы подгружаем стандартный модуль `readline` и сохраняем в константе с таким-же именем.<br>
(Это может быть не `const`, а `var` и назвать можно как угодно)
```js
const readline = new require('readline')
```
---
Затем, мы создаем объект класса `Interface`, с его помощью мы и будем получать данные.
```js
const rl = new readline.Interface({
    input: process.stdin, // Передаем входной поток процесса
    output: process.stdout, // Передаем выхоной поток процесса
    prompt: '' // Это знак в консоли
})
```
---
После этого, нам надо повесить обработчик на событие 'line'.<br>
После того как мы пишем `rl.on(str, func)`, когда будет происходить событие `str` (В нашем случае, это 'line'),
будет запущен func и переданы аргументы (Они зависят от события).
```js
rl.on('line', function(line) {
  // code
})
```


## Обработка данных #1
Считанные данные всегда приходят в виде строки, поэтому мы должны сами разбить их на части.<br>
`String.split(str)` разбивает строку на массив строк, разделяет по `str`, пример:
```js
"Abc, bca, cba,hhh".split(' ') == ["Abc,", "bca,", "cba,hhh"]
```
```js
line = line.split(' ')
```
Мы предполагаем, что нам передали `[число, знак, число]`, поэтому первую и третью строку мы  с помощью `parseInt(str)` превратим в числа.
```js
let a = parseInt(line[0]), b = line[1], c = parseInt(line[2])
```
Также, объявим переменную `val` для итогового значения и дадим ей значение `NaN` (Неизвестное число).
```js
let val = NaN
```
---
Дальше нам надо обработать значения.
Для этого мы используем switch.
```js
switch(b) {
  case '+':
    val = a + c
    break
  case '-':
    val = a - c
    break
  case '*':
    val = a * c
    break
  case '/':
    val = a / c
    break
  default:
    console.log("Операции \'" + b + "\' не существует")
}
```
---
```js
  default:
    console.log("Операции \'" + b + "\' не существует")
```
---
Выводим данные
```js
console.log(a, b, c, '=', val)
```
---
 В случае, если пользователь опечатался или ввел что-то не то, мы должны сказать об этом.
Опевещаем, что калькулятор запущен
```js
console.log("Калькулятор запущен")
```


## Итоговый код
В конце данного шага мы должны получить такой код
```js
const readline = new require('readline')

const rl = new readline.Interface({
    input: process.stdin, // Передаем входной поток процесса
    output: process.stdout, // Передаем выхоной поток процесса
    prompt: '' // Это знак в консоли
})

rl.on('line', function(line) {
    line = line.split(' ')
  
    let a = parseInt(line[0]), b = line[1], c = parseInt(line[2]), val = NaN
    
    switch(b) {
      case '+':
        val = a + c
        break
      case '-':
        val = a - c
        break
      case '*':
        val = a * c
        break
      case '/':
        val = a / c
        break
      default:
        console.log("Операции \'" + b + "\' не существует")
    }
    console.log(a, b, c, '=', val)
})

console.log("Калькулятор запущен")
```



# Шаг #2
В данном шаге мы расширим предыдущий калькулятор, вынеся вычисления в отдельную функцию и улучшив разбиение строки.

## Отдельная функция для вычислений
В процессе создания, наш механизм вычислений усложнится и будет востребован в нескольких местах,
поэтому мы вынесем его в отдельную функцию.<br>
Мы предполагаем что все данные будут уже обработанны, когда они придут в функцию.
```js
function math(input) {
  // code
}
```
---
Теперь перенесем старый код в функцию
```js
function math(input) {
  let a = input[0], b = input[1], c = input[2], val = NaN
  switch(b) {
    case '+':
      val = a + c
      break
    case '-':
      val = a - c
      break
    case '*':
      val = a * c
      break
    case '/':
      val = a / c
      break
    default:
      throw Error("Операции \'" + b + "\' не существует")
  }
  return val
}
```
#### Теперь по изменениям.
Поскольку все данные уже прошли обработку, нету надобности в `parseInt()`
```js
  let a = input[0], b = input[1], c = input[2], val = NaN
```
Теперь мы не просто выводим сообщение о ошибке, а кидаем настоящую ошибку, которую потом обработаем.
```js
      throw Error("Операции \'" + b + "\' не существует")
```
[step1]: https://github.com/lev43/calculator-js/new/main#%D1%88%D0%B0%D0%B3-1
[step1-1]: https://github.com/lev43/calculator-js/new/main#%D1%81%D1%87%D0%B8%D1%82%D1%8B%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5-%D0%B4%D0%B0%D0%BD%D0%BD%D1%8B%D1%85
[step1-2]: https://github.com/lev43/calculator-js/new/main#%D0%BE%D0%B1%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B0-%D0%B4%D0%B0%D0%BD%D0%BD%D1%8B%D1%85-1
[step1-end]: https://github.com/lev43/calculator-js/new/main#%D0%B8%D1%82%D0%BE%D0%B3%D0%BE%D0%B2%D1%8B%D0%B9-%D0%BA%D0%BE%D0%B4

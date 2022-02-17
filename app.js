// const fs = require('fs');
// const path = require('path');

// Всі дії виконувати з допомогою модулів (вручну нічого не створюємо)

// Створити основну папку (main), в яку покласти дві інші папки: перша - online, друга - inPerson
//
// fs.mkdir(path.join(__dirname,'main','online'),{recursive: true}, (err,p) => {
//     if(err) {
//         console.log(err);
//         throw err
//     }
//     fs.readdir(path.join(__dirname, 'main'), (err, data) => {
//         if(err) {
//             console.log(err);
//             throw err
//         }
//         if(data.includes('online')) {
//             fs.mkdir(path.join(__dirname,'main','inPerson'), {recursive: true}, err=> {
//                 if(err){
//                     console.log(err);
//                     throw err
//                 }
//             })
//         }
//     })
// });

// Потім створити в вашому головному файлі (для прикладу app.js) два масиви з обєктами user ({. name: "Andrii", age: 22, city: "Lviv" }),
// відповідно перший - onlineUsers, другий - inPersonUsers;

// fs.appendFile(path.join(__dirname, 'app.js'),
//     '\nconst onlineUsers = [{name: "Andrii", age: 22, city: "Lviv"}];\nconst inPersonUsers = [{name: "Yura", age: 25, city: "Lviv"}];',
//         err => {
//     if(err) {
//         console.log(err);
//         throw err
//     }
// });

// const onlineUsers = [{name: "Andrii", age: 22, city: "Lviv"}];
// const inPersonUsers = [{name: "Yura", age: 25, city: "Lviv"}];

// і створити файли txt в папках (online, inPerson) в яких як дату покласти юзерів з ваших масивів, але щоб ваш файл виглядав як
// NAME: ім'я з обєкту і т.д і всі пункти з нового рядка.

// const keyValue = (location, arr) => {
//     for(let i = 0; i < arr.length; i++) {
//     for(let k in arr[i]) {
//         fs.appendFile(path.join(__dirname, 'main', location, 'online.txt'), `${k}:${arr[i][k]}\n`, err => {
//             if(err) {
//                 console.log(err);
//                 throw err
//             }
//         })
//     }}
// }
// keyValue('online',onlineUsers)
// keyValue('inPerson',inPersonUsers)
//
// Коли ви це виконаєте напишіть функцію яка буде міняти місцями юзерів з одного файлу і папки в іншу.
// (ті, що були в папці inPerson будуть в папці online)
//

// варіант 1
// const swap = () => {
//     fs.readdir(path.join(__dirname, 'main', 'inPerson'), (err,data)=> {
//         if(err){
//             console.log(err);
//             throw err
//         }
//         if(data.includes('inPerson.txt') && !data.includes('online.txt')) {
//             fs.rename(path.join(__dirname, 'main', 'inPerson', 'inPerson.txt'), path.join(__dirname, 'main', 'online', 'inPerson.txt'),
//                 err => {
//                     if (err) {
//                         console.log(err);
//                         throw err
//                     }
//                 })
//             fs.rename(path.join(__dirname, 'main', 'online', 'online.txt'), path.join(__dirname, 'main', 'inPerson', 'online.txt'), err => {
//                 if(err) {
//                     console.log(err);
//                     throw err
//                 }
//             })
//         }
//         if(data.includes('online.txt') && !data.includes('inPerson.txt')) {
//             fs.rename(path.join(__dirname,'main', 'inPerson', 'online.txt'), path.join(__dirname, 'main', 'online','online.txt'),
//                 err => {
//                     if(err) {
//                         console.log(err);
//                         throw err
//                     }
//                 })
//             fs.rename(path.join(__dirname,'main', 'online', 'inPerson.txt'), path.join(__dirname, 'main', 'inPerson', 'inPerson.txt'), err=> {
//                 if(err) {
//                     console.log(err);
//                     throw err
//                 }
//             })
//         }
//     })
// };
// swap()


// варіант 2
// const swap2 = (oldLocation, newLocation, fileNameTXT) => {
//     fs.rename(path.join(__dirname,'main',oldLocation ,`${fileNameTXT}.txt`), path.join(__dirname,'main', newLocation,`${fileNameTXT}.txt`),
//         (err) => {
//             if(err) {
//                 console.log(err);
//                 throw err
//             }
//         })
// };
//
// swap2('inPerson', 'online', 'online');
// swap2('online', 'inPerson', 'inPerson')
const path = require('path');
const fs = require('fs');
// Завдання на практику
//
// 1. Спробуйте створити якийсь файл txt, прочитайте з нього дані і одразу, дані які ви отримали запишіть їх в інший файл,
// в вас вийде невеликий callback hell, пізніше я вам покажу
// як можна це обійти, але поки зробіть так

//
// fs.writeFile(path.join(__dirname, 'classwork_1.txt'), 'classwork', err=>{
//     if(err) {
//         console.log(err);
//     }
// });
//
// fs.readFile(path.join(__dirname, 'classwork_1.txt'), 'utf8', (err,data) => {
//     if(err) {
//         throw err
//     }
//         fs.writeFile(path.join(__dirname, 'classwork_1_Copy.txt'), `\n${data}`, err => {
//         if(err) {
//             console.log(err);
//         }
//
//     })
// });

// 2. Створіть файл ( можете вручну ) заповніть його якимись даними
// Прочитайте його, скопіюйте всі дані з нього і перенесіть їх в нову папку та файл в ній,
// старий файл видаліть після того як все завершиться. Також вийде callback hell
//
// const writeFile = (callback) => {
//     fs.writeFile(path.join(__dirname, 'task_2.txt'), 'okten school it`s cool', err => {
//         if (err) throw err
//     })
//     callback()
// };
//
// const readFile = (callback) => {
//     fs.readFile(path.join(__dirname, 'task_2.txt'), (err, data) => {
//         if (err) throw err;
//         fs.mkdir(path.join(__dirname,'new_directory'), err => {
//             if(err) throw err
//         })
//         fs.appendFile(path.join(__dirname, 'new_directory', 'new_directory.txt'), data, (err, data) => {
//             if (err) throw err
//         })
//     });
//     callback()
// };
//
// const unlink = () => {
//     fs.unlink(path.join(__dirname, 'task_2.txt'), err => {
//         if (err) throw err
//     })
// };
//
// writeFile(()=> {
//     readFile(()=> {
//         unlink()
//     })
// });

//
// 3. Створіть папку (можете вручну) напишіть скріпт який створить в ній якись дані
// (можуть бути нові папки і файли(в файли запишіть якусь дату) )
// і напишіть функцію яка буде зчитувати папку і перевіряти якщо дані які в ній лежать - це файли тоді вам потрібно
// їх очистити, але не видаляти, якщо дані - це папки, вам потрібно їх перейменувати і додати до назви префікс _
//
// fs.mkdir(path.join(__dirname, 'last_task'), err=> {
//     if(err) throw err
// });
//
// fs.mkdir(path.join(__dirname,'last_task', 'okten'), { recursive: true} , err=> {
//     if(err) throw err;
//     fs.writeFile(path.join(__dirname,'last_task', 'node.txt'), 'module, global,os,path,fs', (err => {
//         if(err) throw err
//     }))
// });
//
// const readFolder = () => {
//     fs.readdir(path.join(__dirname,'last_task'),  (err,data) => {
//         if(err) throw err;
//         data.forEach(dat => {
//             if(dat.includes('.')) {
//                 fs.truncate(path.join(__dirname, 'last_task', dat), err => {
//                     if(err) throw err
//                 })
//             } else {
//                 fs.rename(path.join(__dirname, 'last_task', dat), path.join(__dirname, 'last_task', `${dat}_`), err=> {
//                     if(err) throw err
//                 })
//             }
//         })
//     })
// }
// readFolder()

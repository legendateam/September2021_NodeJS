const path = require('path');
const express = require('express');
const {engine} = require('express-handlebars');

const {users} = require('./db/users');
const {PORT} = require('./configs/varieble');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(express.static(path.join(__dirname, 'static')));
app.set('view engine', '.hbs');
app.engine('.hbs', engine({defaultLayout:false}));
app.set('views', path.join(__dirname, 'static'));

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/signIn', (req, res) => {
    res.render('signIn')
})

app.get('/users', (req, res) => {
    const {age,city} = req.query;
    if(!age && !city) {
        res.render('users', {users});
    }
    if(!!users.length) {
        if(age){
            const usersFilterAge = users.filter(user => user.age.toString() === age);
            res.render('users', {usersFilterAge})
        }
        if(city){
            const usersFilterCity = users.filter(user => user.city.toLowerCase() === city.toLowerCase());
            res.render('users', {usersFilterCity})
        }
    }
})

app.get('/users/:userIndex', (req, res) => {
    const {userIndex} = req.params;
    const user = users.find((_, index) => index.toString() === userIndex);
    const index = users.indexOf(user);
    if(user) {
        res.render('user', {user,index})
    } else if (!user) {
        res.redirect('/404')
    }
})

app.post('/login', (req, res) => {
    const email = users.some(user => user.email === req.body.email);
    if(!email) {
        users.push(req.body);
        res.redirect('/users');
    } else if(email) {
        res.redirect('/404')
    }
});

app.post('/signIn', (req, res) => {
    console.log(req.body);
    console.log(typeof req.body.password);
    const find = users.find(user => user.email === req.body.email && user.password === req.body.password);
    const indexOf = users.indexOf(find);
    if(find) {
        res.redirect(`/users/${indexOf}`)
    } else if(!find) {
        res.redirect('/login')
    }
})

app.post('/users/:userIndex', (req, res) => {
    const {userIndex} = req.params;
    const number = Number(userIndex);
    users.splice(number,1);
    res.redirect('/users')
})

app.listen(PORT, ()=> {
    console.log(`Server running at PORT:${PORT}`);
});

app.use((req, res) => {
    res.render('notFound')
})

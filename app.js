const path = require('path');
const express = require('express');
const { engine } = require('express-handlebars');

const { PORT } = require('./configs/variable');
const { users } = require('./db/users');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(express.static(path.join(__dirname, 'static')));
app.set('view engine', '.hbs');
app.engine('.hbs', engine({defaultLayout:false}));
app.set('views', path.join(__dirname, 'static'));

app.get('/login', (req,res)=> {
    res.render('login');
});

app.get('/users', (req,res) => {
    const {sortAge,age,city} = req.query;
    if(!age && !city) {
        res.render('users', { users });
    }
    if(sortAge === 'plus') {
        users.sort((a,b) => a.age - b.age)
    }
    if(sortAge === 'minus') {
        users.sort((a,b) => b.age - a.age)
    }
    if(!!users.length) {
        if(age) {
            const usersAge = users.filter(user => user.age.toString() === age);
            res.render('users', {usersAge})
        }
        if(city) {
            const usersCity = users.filter(user => user.city.toLowerCase() === city.toLowerCase());
            res.render('users', {usersCity})
        }
    }
});

app.get('/login/error', (req, res) => {
    res.render('errorLogin')
});

app.get('/users/:userIndex', (req, res) => {
    const {userIndex} = req.params;
    const user = users.find((_, index)=> index.toString() === userIndex);
    if(user) {
        res.render('user', {user})
    }
    if(!user) {
        res.redirect('/404')
    }
});

app.post('/login', (req, res) => {
    if(!users.length) {
        users.push(req.body);
        res.redirect('/users');
    }
    if(!!users.length) {
        const some = users.some(user => user.email === req.body.email);
        if(some) {
            res.redirect('/login/error')
        }
        if(!some) {
            users.push(req.body);
            res.redirect('/users');
        }
    }
});

app.use((req, res) => {
    res.render('notFoundPage')
})

app.listen(PORT, ()=> {
    console.log(`Server running at PORT:${PORT}`);
});



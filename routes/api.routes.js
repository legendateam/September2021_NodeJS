const {Router} = require('express');

const {loginRouter} = require('./login.router');
const {usersRouter} = require('./users.router');
const {signInRouter} = require('./signIn.router');

const router = Router();

router.use('/login', loginRouter);
router.use('/users',usersRouter);
router.use('/signIn', signInRouter);
router.use((req,res)=> {
   res.status(404).render('notFoundPage')
});

module.exports = {
    apiRouters: router
};
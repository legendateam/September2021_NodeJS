const {Router} = require('express');

const {loginRouter} = require('./login.router');
const {usersRouter} = require('./users.router');

const router = Router();

router.use('/login', loginRouter);
router.use('/users',usersRouter);

module.exports = {
    apiRouters: router
};
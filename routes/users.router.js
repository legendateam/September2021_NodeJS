const {Router} = require('express');

const {usersController} = require('../controllers/users.controller');
const {userMiddleware} = require('../middlewares/user.middleware');

const usersRouter = Router();

usersRouter.get('/', usersController.renderUsers);
usersRouter.get('/:userIndex', userMiddleware , usersController.renderUser);
usersRouter.post('/:userIndex', usersController.deleteUser);

module.exports = {
    usersRouter
}

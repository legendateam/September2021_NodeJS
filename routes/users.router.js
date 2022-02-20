const {Router} = require('express');

const {usersController} = require('../controllers/users.controller');

const usersRouter = Router();

usersRouter.get('/', usersController.renderUsers);

module.exports = {
    usersRouter
}

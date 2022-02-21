const {Router} = require('express');

const {isLoginValidMiddleware} = require('../middlewares/login.middleware');
const {loginController} = require('../controllers/login.controller');

const loginRouter = Router();

loginRouter.get('/', loginController.renderLogin);
loginRouter.post('/', isLoginValidMiddleware, loginController.setUser);

module.exports = {
    loginRouter
}
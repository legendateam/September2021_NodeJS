const {Router} = require('express');

const {isLoginValid} = require('../middlewares/login.middleware');
const {loginController} = require('../controllers/login.controller');

const loginRouter = Router();

loginRouter.get('/', loginController.renderLogin);
loginRouter.post('/', isLoginValid, loginController.setUser);

module.exports = {
    loginRouter
}
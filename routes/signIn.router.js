const {Router} = require('express');

const {signInController} = require('../controllers/signIn.controller');
const {signInMiddleware} = require('../middlewares/signIn.middleware');

const signInRouter = Router();

signInRouter.get('/', signInController.renderPage);
signInRouter.post('/', signInMiddleware ,signInController.redirectUser);

module.exports = {
    signInRouter
}
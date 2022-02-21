const {users} = require('../db/users');

class SignInController {
    renderPage(req,res) {
        res.render('signIn');
    }
    redirectUser(req,res) {
        const {email, password} = req.body;
        const find = users.find(user => user.email === email && user.password === password);
        const indexOF = users.indexOf(find);
        res.redirect(`/users/${indexOF}`).render('user', {user:find});
    }
}

module.exports = {
    signInController: new SignInController()
}
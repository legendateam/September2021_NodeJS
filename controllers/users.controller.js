const {users} = require('../db/users');

class UsersController {
    renderUsers(req,res) {
        res.render('users', {users})
    }
}

module.exports = {
    usersController: new UsersController()
}
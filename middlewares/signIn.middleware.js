const {users} = require('../db/users');

const signInMiddleware = (req, res, next) => {
    try {
        const {email, password} = req.body;
        const find = users.find(user => user.email === email && user.password === password);

        if (!email || !password) {
            throw new Error('All fields must be filled');
        }

        if (!find) {
            throw new Error('The user is not registration');
        }

        next();
    } catch (e) {
        res.status(400).end(e.message)
    }
};

module.exports = {
    signInMiddleware
}
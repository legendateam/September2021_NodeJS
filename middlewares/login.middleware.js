const {users} = require('../db/users');

const isLoginValidMiddleware = (req,res,next) => {
    try {
        const {firstName, lastName, email, password, age, city} = req.body;
        const some = users.some(user => user.email.toLowerCase() === email.toLowerCase());

        if(some || !firstName || !lastName || !email || !password || !age || !city) {
            throw new Error('field cannot be empty pr the user already exists')
        }

        next()
    } catch (e) {
        res.status(400).end(e.message)
    }
};

module.exports = {
    isLoginValidMiddleware
}
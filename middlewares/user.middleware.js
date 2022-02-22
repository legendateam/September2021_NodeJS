const {users} = require('../db/users');

const userMiddleware = (req,res, next) => {
    try {
        const {userIndex} = req.params;
        const user = users[Number(userIndex)];

        if(!user) {
            throw new Error('not Found Page')
        }

        next();
    } catch (e) {
        res.status(400).end(e.message);
    }
};

module.exports = {
    userMiddleware
}
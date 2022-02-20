const isLoginValid = (req,res,next) => {
    try {
        const {firstName, lastName, email, password, age, city} = req.body;
        if(!firstName || !lastName || !email || !password || !age || !city) {
            throw new Error('field cannot be empty')
        }
        next()
    } catch (e) {
        res.status(400).end(e.message)
    }
}

module.exports = {
    isLoginValid
}
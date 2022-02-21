const {users} = require('../db/users');

class UsersController {
    renderUsers(req,res) {
        const {city,age} = req.query;

        if(city && !age) {
            const filterUsersCity = users.filter(user => user.city.toLowerCase() === city.toLowerCase());
            if(!!filterUsersCity.length){
                res.render('users', {filterUsersCity});
            }
        }
        if(age && !city) {
            const filterUsersAge = users.filter(user => user.age.toString() === age);
            if(filterUsersAge.length) {
                res.render('users', {filterUsersAge});
            }
        }
        if(city && age) {
            const filterUsersCityAge = users.filter(user => user.age.toString() === age && user.city.toLowerCase() === city.toLowerCase());
            if(!!filterUsersCityAge.length) {
                res.render('users', {filterUsersCityAge});
            }
        }

        if(!city && !age) {
            res.render('users', {users});
        }
    }
    renderUser(req,res) {
        const {userIndex} = req.params;
        const user = users[Number(userIndex)];
        res.render('user', {user,userIndex});
    }
    deleteUser (req,res) {
        const {userIndex} = req.params;
        users.splice(Number(userIndex),1);
        res.redirect('/users');
    }
}

module.exports = {
    usersController: new UsersController()
}
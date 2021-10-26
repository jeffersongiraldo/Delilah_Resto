const userModel = require('../models/user.model');

module.exports = async (obj) => {

    //Condition to find the user by his/her username
    if(obj.hasOwnProperty("username")) {
        const userFound = await userModel.findOne({
            where: {username: obj.username}
        })
        return userFound;
    }

    //Condition to find the user by his/her email
    const userFound = await userModel.findOne({
        where: {email: obj.email}
    })
    return userFound;
}
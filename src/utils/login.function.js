const userModel = require('../models/user.model');

module.exports = async (obj) => {
    if(obj.hasOwnProperty("username")) {
        const userFound = await userModel.findOne({
            where: {username: obj.username}
        })
        return userFound;
    }
    const userFound = await userModel.findOne({
        where: {email: obj.email}
    })
    return userFound;
}
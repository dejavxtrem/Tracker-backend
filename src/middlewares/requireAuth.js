const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const User = mongoose.model('User')


module.export = (req, res, next) => {
    const { authorization } = req.headers;
    
    //to check if the user authorization token is valid
    if(!authorization) {
        return res.status()
    }
}

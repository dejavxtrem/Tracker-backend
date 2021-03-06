const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema =  mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true}
}, {timestamp: true})



// presave function to check if the user has not modified his password
userSchema.pre('save', function(next) {
    const user = this
    if (!user.isModified('password')) {
        return next()
    }

    bcrypt.genSalt(10, (err, salt) => {
        if (err) {
            return next(err)
        }

        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) {
                return next(err)
            }
            user.password = hash;
            next()
            
        })
    })
})


//password checking function to compare the incoming password
userSchema.methods.comparePassword = function (userPassword) {
    const user = this
    return new Promise((resolve, reject) => {
            bcrypt.compare(userPassword, user.password, (err, isMatch) => {
                    if (err) {
                        return reject(err)
                    }
                    if (!isMatch) {
                        return  reject(false)
                    }

                    resolve(true)
            })
    })
}




module.exports = mongoose.model('User', userSchema);
const express = require('express')
 const mongoose = require('mongoose')
 const morgan = require('morgan')
 require('dotenv').config()
 require('./models/User')
 require('./models/Track')
 //router import
 const authRoutes = require('./routes/authRoutes')
 const trackRoutes = require('./routes/trackRoutes')
 const requireAuth = require('./middlewares/requireAuth')
 
 

 const app = express()

//middleware
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(authRoutes)
app.use(trackRoutes)
app.use(morgan("tiny"))




const PORT = process.env.PORT || 3000


 //mongo connection
 const mongoURI = process.env.MONGODB_URI
 mongoose.connect(mongoURI, {
     useNewUrlParser: true,
     useCreateIndex: true
 })

mongoose.connection.on('connected', () => {
    console.log('connected to mongo instance')
})

mongoose.connection.on('error', (err) => {
    console.err('Error connecting to mongo', err)
})


app.get('/', requireAuth, (req, res) => {
     res.send(`Your email: ${req.user.email}`)
 })



app.listen(PORT, () => {
    console.log('Listening on port 3000')
})
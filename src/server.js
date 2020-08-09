const express = require('express')
 const mongoose = require('mongoose')
 require('dotenv').config()
 //router import
 const authRoutes = require('./routes/authRoutes')
 require('./models/User')

 const app = express()

//middleware
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(authRoutes)







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


 app.get('/', (req, res) => {
     res.send('Hi there')
 })

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log('Listening on port 3000')
})
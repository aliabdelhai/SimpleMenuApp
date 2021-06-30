const express = require('express')
const path = require('path')
const app = express()
const api = require('./server/routes/api')
const mongoose = require('mongoose')
const url = "mongodb+srv://AliAbed:hL6QVC99JuYjB9wh@cluster0.g0jq7.mongodb.net/SimpleMenu?retryWrites=true&w=majority"
mongoose.connect( url,{useNewUrlParser: true, useUnifiedTopology: true,useFindAndModify: false }) 
.then(() => console.log( 'Database Connected' ))
.catch(err => console.log( err ));

app.use(express.static(path.join(__dirname, 'build')));
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')
    next()
})
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/', api)
app.use(express.static(path.join(__dirname,'build')))

const port = 8080
app.listen(( port), function () {
    console.log(`server runs on port : ${port}`)
})
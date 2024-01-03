const connection = require('./connection')
const env = require('dotenv').config
const express = require('express')
const app = express()
const cookieParser = require('cookie-parser');
const routes = require('./routes/route')
const cors = require('cors')
const bodyParser = require('body-parser')

app.use(cookieParser());

app.use(cors({
    origin: 'http://localhost:5173',
}))

app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json())

app.use('/', routes)

module.exports = app
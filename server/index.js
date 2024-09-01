require('./database/connection')
const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const cors = require('cors')
const routes = require('./route')
const cookieParser = require('cookie-parser')

app.use(cookieParser());

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(cors({ origin: true, credentials: true }));
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', routes)

module.exports = app
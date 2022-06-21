const express = require('express');
const app = express();
const pathjs = require('path');
const engine = require('ejs-mate');
const mongoose = require('mongoose')

// middlewares
app.engine('ejs', engine);
app.set('view engine', 'ejs')
app.set('views', pathjs.join(__dirname, 'views'));
app.use(express.static(pathjs.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// database
mongoose.connect(process.env.DB_URL || 'mongodb://localhost:27017/billing')
    .then(res => console.log('connected to', res.connection.host))
    .catch(err => console.log('connection error'));

// routing
app.use('/', require('./routes/home'))
app.use('/inventory', require('./routes/inventory'))

// start server
const port = process.env.PORT || 80;
app.listen(port, () => {
    console.log('Server is running at port', port);
})
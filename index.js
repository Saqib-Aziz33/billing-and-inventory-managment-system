if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}
const express = require('express');
const app = express();
const pathjs = require('path');
const engine = require('ejs-mate');
const mongoose = require('mongoose')
const session = require('express-session')
const flash = require('connect-flash')

// middlewares
app.engine('ejs', engine);
app.set('view engine', 'ejs')
app.set('views', pathjs.join(__dirname, 'views'));
app.use(express.static(pathjs.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 172_800_000, // 2 days
        maxAge: 172_800_000,
        httpOnly: true
    }
}))
app.use(flash())
app.use((req, res, next) => {
    res.locals.successMsg = req.flash('success')
    res.locals.errorMsg = req.flash('error')
    next()
})

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
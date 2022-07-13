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
const methodOverride = require('method-override')
const MongoStore = require('connect-mongo');
const helmet = require('helmet')
const compression = require('compression')
// files
const {isAuthenticated} = require('./util/middlewares')

const DB_URL = process.env.DB_URL || 'mongodb://localhost:27017/billing'

// middlewares
app.engine('ejs', engine);
app.set('view engine', 'ejs')
app.set('views', pathjs.join(__dirname, 'views'));
app.use(express.static(pathjs.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'))
app.use(session({
    store: MongoStore.create({
        mongoUrl: DB_URL,
        touchAfter: 24*60*60,
        secret: process.env.SESSION_SECRET
    }),
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
    res.locals.user = req.session.user
    next()
})
app.use(helmet())
app.use(compression())

// database
mongoose.connect(DB_URL)
    .then(res => console.log('connected to', res.connection.host))
    .catch(err => console.log('connection error'));

// routing
app.use('/', require('./routes/home'))
app.use('/users', isAuthenticated, require('./routes/users'))
app.use('/inventory', isAuthenticated, require('./routes/inventory'))
app.use('/bill', isAuthenticated, require('./routes/bill'))

// start server
const port = process.env.PORT || 80;
app.listen(port, () => {
    console.log('Server is running at port', port);
})
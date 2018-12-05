var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();
var mongoose = require('mongoose');
var cors = require('cors');
var cookieParser = require('cookie-parser');
var expressValidator = require('express-validator');

//auth
var session = require('express-session');
var passport = require('passport');
var MongoDBStore = require('connect-mongodb-session')(session);

mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost/doodledb', { promiseLibrary: require('bluebird') })
    .then(() =>  console.log('connection succesful'))
    .catch((err) => console.error(err));

var store = new MongoDBStore({
    uri: 'mongodb://localhost:27017/doodledb',
    collection: 'sessions'
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended':'false'}));
app.use(expressValidator());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public/dist/angular6')));
//app.use('/', express.static(path.join(__dirname, 'public/dist/angular6')));
app.get('/*', (req, res) => res.sendFile(path.join(__dirname)));

app.use(session({
    secret: 'hqdqshdlqdhqlsdmjqsd',
    resave: false,
    saveUninitialized: true,
    store: store
}));
app.use(passport.initialize());
app.use(passport.session());
/*
const corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
*/
require('./routes/users.js')(app);
require('./routes/index.js')(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    //res.locals.message = err.message;
    //res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.send(JSON.stringify('error'));
});

module.exports = app;
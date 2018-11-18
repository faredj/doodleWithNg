var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var app = express();
var mongoose = require('mongoose');
const cors = require('cors')

mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost/doodledb', { promiseLibrary: require('bluebird') })
    .then(() =>  console.log('connection succesful'))
    .catch((err) => console.error(err));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended':'false'}));
app.use(express.static(path.join(__dirname, 'public/dist/angular6')));
app.use('/', express.static(path.join(__dirname, 'public/dist/angular6')));

const corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

require('./routes/users.js')(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.send(JSON.stringify('error'));
});

module.exports = app;
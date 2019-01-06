/**
 * @fileOverview this file is the main application file that initialize all middleware and lunch server
 */

//importer les modules à utiliser
let express = require('express'),
    http = require('http'),
    passport = require('passport'),
    bodyParser = require('body-parser'),
    app = express(),
    mongoose = require('mongoose'),
    cors = require('cors'),
    cookieParser = require('cookie-parser'),
    expressValidator = require('express-validator');

//init port
port = process.env.PORT || '3000';

//use bleubird for the async*/
mongoose.Promise = require('bluebird');

//Database Connection*/
mongoose.connect('mongodb://localhost/doodledb', {promiseLibrary: require('bluebird')})
    .then(() => console.log('Connexion à MongoDB réussie'))
    .catch((err) => console.error(err));
    
mongoose.set('useFindAndModify', false);

//parse the req.body to exploit the received data*/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended': true}));

//initialser passport et invoker la JWTstrategy
app.use(passport.initialize());
require('./config/passport')(passport);

//express-validator contains validation functions used by Express*/
app.use(expressValidator());

//coockie-parser utilisé pour parser req.cookie
app.use(cookieParser());

//déclarer les CORS options
const corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200
};

//activate CORS with already defined options*/
app.use(cors(corsOptions));

require('./routes/index')(app);
require('./routes/users')(app);
require('./routes/calendars')(app);
require('./routes/bookings')(app);
require('./routes/invitations')(app);

// capture error 404*/
app.use((req, res, next) => {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler*/
app.use((err, req, res) => {
    res.status(err.status || 500);
    res.send(JSON.stringify('error'));
});

//set the port of the application*/
app.set('port', port);


//create the server*/
var server = http.createServer(app);

//lancer le serveur
server.listen(port);
module.exports = app;


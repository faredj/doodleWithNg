//importer les modules à utiliser*/

//Require the dev-dependencies*/
var express = require('express'),
	http = require('http'),
	path = require('path'),
	config = require('./config/config'),
	bodyParser = require('body-parser'),
	app = express(),
	mongoose = require('mongoose'),
	cors = require('cors'),
	cookieParser = require('cookie-parser'),
	expressValidator = require('express-validator'),
	session = require('express-session'),
	passport = require('passport'),
	MongoDBStore = require('connect-mongodb-session')(session),
	
	/*initialise the port*/
	port = process.env.PORT || '3000';

//use bleubird for the async*/
mongoose.Promise = require('bluebird');

//Database Connection*/
mongoose.connect('mongodb://localhost/doodledb', {promiseLibrary: require('bluebird')})
.then(() => console.log('connection succesful'))
.catch((err) => console.error(err));

//save Express session in MongoDB*/
var store = new MongoDBStore({
	uri: 'mongodb://localhost:27017/doodledb',
	collection: 'sessions'
});

//parse the req.body to exploit the received data*/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended': 'false'}));

//express-validator contains validation functions used by Express*/
app.use(expressValidator());

// to load the Angular6 application from the directory 'public/dist/browser'*/
app.use('/', express.static(path.join(__dirname, 'public/dist/browser')));

//app.get('/*', (req, res) => res.sendFile(path.join(__dirname)));

//create a session using the options provided as an object*/
app.use(session({
	secret: config.privateKey,
	resave: false,
	saveUninitialized: true,
	store: store
}));

//coockie-parser used to parser req.cookie*/
app.use(cookieParser());

//initialise the Passport module used by Express*/
app.use(passport.initialize());

//modify the object req and modify the value 'user'*/
app.use(passport.session());

//declare the CORS options*/
const corsOptions = {
	origin: 'http://localhost:4200',
	optionsSuccessStatus: 200
};

//activate CORS with already defined options*/
app.use(cors(corsOptions));

require('./routes/users')(app);
require('./routes/calendars')(app);
require('./routes/bookings')(app);

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

//launch the server*/
server.listen(port);
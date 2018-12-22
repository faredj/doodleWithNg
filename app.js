//importer les modules à utiliser
var express = require('express'),
	http = require('http'),
	path = require('path'),
	bodyParser = require('body-parser'),
	app = express(),
	mongoose = require('mongoose'),
	cors = require('cors'),
	cookieParser = require('cookie-parser'),
	expressValidator = require('express-validator'),
	session = require('express-session'),
	passport = require('passport'),
	MongoDBStore = require('connect-mongodb-session')(session),
	
	//init port
	port = process.env.PORT || '3000';

//utiliser bleubird pour l'async
mongoose.Promise = require('bluebird');

//connexion à la base de donnée
mongoose.connect('mongodb://localhost/doodledb', {promiseLibrary: require('bluebird')})
.then(() => console.log('connection succesful'))
.catch((err) => console.error(err));

//enregistrer la session Express dans MongoDB
var store = new MongoDBStore({
	uri: 'mongodb://localhost:27017/doodledb',
	collection: 'sessions'
});

//parser le req.body pour exploiter les données reçues
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended': 'false'}));

//express-validator contient des fonctions de validations utilisés par Express
app.use(expressValidator());

//coockie-parser utilisé pour parser req.cookie
app.use(cookieParser());

//charger l'application Angular6 depuis le répertoire 'public/dist/browser'
app.use('/', express.static(path.join(__dirname, 'public/dist/browser')));

//app.get('/*', (req, res) => res.sendFile(path.join(__dirname)));

//créer une session en utilisant les options fournies sous forme d'un objet
app.use(session({
	secret: 'hqdqshdlqdhqlsdmjqsd',
	resave: false,
	saveUninitialized: true,
	store: store
}));

//initialiser le module Passport utilisé par Express
app.use(passport.initialize());

//modifier l'objet req et modifier la valeur 'user'
app.use(passport.session());

//
const corsOptions = {
	origin: 'http://localhost:4200',
	optionsSuccessStatus: 200
};

//activer CORS avec les options déjà définies
app.use(cors(corsOptions));

require('./routes/users.js')(app);
require('./routes/index.js')(app);
require('./routes/calendars.js')(app);

// capturer l'erreur 404
app.use(function (req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handler
app.use(function (err, req, res) {
	res.status(err.status || 500);
	res.send(JSON.stringify('error'));
});

//set le port de l'application
app.set('port', port);


//créer le serveur
var server = http.createServer(app);

//lancer le serveur
server.listen(port);
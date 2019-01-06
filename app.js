//importer les modules à utiliser
let express = require('express'),
    http = require('http'),
    path = require('path'),
    passport = require('passport'),
    config = require('./config/config'),
    bodyParser = require('body-parser'),
    app = express(),
    mongoose = require('mongoose'),
    cors = require('cors'),
    cookieParser = require('cookie-parser'),
    expressValidator = require('express-validator');

//init port
port = process.env.PORT || '3000';

//utiliser bleubird pour l'async
mongoose.Promise = require('bluebird');

//connexion à la base de donnée
mongoose.connect('mongodb://localhost/doodledb', {promiseLibrary: require('bluebird')})
    .then(() => console.log('Connexion à MongoDB réussie'))
    .catch((err) => console.error(err));

//parser le req.body pour exploiter les données reçues
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended': true}));

//initialser passport et invoker la JWTstrategy
app.use(passport.initialize());
require('./config/passport')(passport);

//express-validator contient des fonctions de validations utilisés par Express
app.use(expressValidator());

//charger l'application Angular6 depuis le répertoire 'public/dist/browser'
app.use('/', express.static(path.join(__dirname, 'public/dist/browser')));

//app.get('/*', (req, res) => res.sendFile(path.join(__dirname)));

//coockie-parser utilisé pour parser req.cookie
app.use(cookieParser());

//déclarer les CORS options
const corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200
};

//activer CORS avec les options déjà définies
app.use(cors(corsOptions));

require('./routes/users')(app);
require('./routes/calendars')(app);
require('./routes/bookings')(app);
require('./routes/invitations')(app);

// capturer l'erreur 404
app.use((req, res, next) => {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use((err, req, res) => {
    res.status(err.status || 500);
    res.send(JSON.stringify('error'));
});

//set le port de l'application
app.set('port', port);


//créer le serveur
var server = http.createServer(app);

//lancer le serveur
server.listen(port);
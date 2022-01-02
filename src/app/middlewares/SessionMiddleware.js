const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

var store = new MongoDBStore({
    uri: 'mongodb://localhost:27017/connect_mongodb_session_test',
    collection: 'mySessions'
});

// Catch errors
store.on('error', function(error) {
    console.log(error);
});

module.exports = function(app) {
    app.set('trust proxy', 1) // trust first proxy
    app.use(session({
        secret: 'keyboard cat',
        cookie: {
            // secure: true,
            maxAge: 600000000
        },
        store: store,
        resave: true,
        saveUninitialized: true,
    }));
}
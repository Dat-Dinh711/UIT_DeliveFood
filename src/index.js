const path = require('path');
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const paypal = require('paypal-rest-sdk');
const app = express();
const port = 3000;

const SortMiddleware = require('./app/middlewares/SortMiddleware');
const AuthResLocalMiddleware = require('./app/middlewares/AuthResLocalMiddleware');
const CartNotifyLocalMiddleware = require('./app/middlewares/CartNotifyLocalMiddleware');
const OrderLocalMiddleware = require('./app/middlewares/OrderLocalMiddleware');
const AddressLocalMiddleware = require('./app/middlewares/AddressLocalMiddleware');

const route = require('./routes');
const db = require('./config/db');

// Connect to DB
db.connect();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, '../public')));

app.use(express.urlencoded({
    extended: true,
}));
app.use(express.json());

app.use(methodOverride('_method'));

require('./app/middlewares/SessionMiddleware')(app);
app.use(flash());

// Custom Middleware
app.use(SortMiddleware, AuthResLocalMiddleware, CartNotifyLocalMiddleware, OrderLocalMiddleware, AddressLocalMiddleware);

// HTTP logger
// app.use(morgan('combined'));

// Template engine
require('./app/middlewares/ViewMiddleware')(app);

app.set('views', path.join(__dirname, 'resources', 'views'));

// Routes init
route(app);

// Paypal
paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': 'AXsHaNZ1HMfRHEdlPrtWrlp9AntT7nMIYL7R1a4GXSzWIBekCRygKlTiBaE2B6Yc1t7UktyWRy8CD-kQ',
    'client_secret': 'EIs1hID1rIYC6qhC3YWHat2Mm-k026QZEm9JdwXwDpFCUQr2NY1I4vYxERjY1IIYakTfcM5pYASil_o0'
});

// app.all('*', function(req, res) {
//     res.redirect('/error');
// });

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
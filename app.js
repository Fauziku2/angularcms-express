const express = require('express');
// const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config/database');
const cors = require('cors');
const morgan = require('morgan');

// Connect to db
mongoose.connect(config.database,  {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open',  () => {
    console.log('connected to mongoDB')
});

//Init App
let app = express();

// Prettyfy JSON
app.set('json spaces', 40);

app.use(cors());

//Body-parser middleware

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));

// parse application/json
app.use(bodyParser.json());

// logger
app.use(morgan('dev'));

// Set routes
let pages = require('./routes/pages');
let users = require('./routes/users');
let sidebar = require('./routes/sidebar');

app.use('/pages', pages);
app.use('/users', users);
app.use('/sidebar', sidebar);

// Start the server
let port = 3000;
app.listen(port,  () => {
    console.log('server running at ' + port)
});

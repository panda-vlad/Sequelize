const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');

const db = require('./config/database');

const app = express();

// Test db
db.authenticate()
  .then(() => console.log('Connected'))
  .catch((err) => console.log(err));

// Body parser
app.use(bodyParser.urlencoded({ extended: false }));

// Handle Bars
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
// Set Static folder
app.use(express.static(path.join(__dirname, 'public')));

//Index route
app.get('/', (req, res) => res.render('index', { layout: 'landing' }));

// Gig routes
app.use('/gigs', require('./routes/gigs'));

const PORT = process.env.PORT || 3001;

app.listen(PORT, console.log('Server started ' + PORT));

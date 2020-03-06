'use strict';

// ******************************************************************************
// *** Dependencies
// =============================================================
const express = require(`express`);

// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 3000;

// Requiring our models for syncing
const db = require(`./models`);

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static directory
app.use(express.static(`public`));

// Set Handlebars.
const expressHandlebars = require('express-handlebars');

app.engine('handlebars', expressHandlebars({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Routes
// =============================================================
require(`./routes/api-routes.js`)(app);
require(`./routes/html-routes.js`)(app);

// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync({ force: true }).then(() => {
  app.listen(PORT, () =>
    console.log(`App listening on http://localhost:${PORT}`)
  );
});


// //Dependencies
// const express = require('express');
// const exphbs = require('express-handlebars');
// const bodyParser = require('body-parser');
// const path = require('path');

// //Sets up the Express App
// const app = express();
// const PORT = process.env.PORT || 3000;

// //Get LANDING PAGE
// app.get('/', (req, res) => res.send('LANDING PAGE HERE'));

// //Database
// const db = require('./config/connection');

// //Database connection test
// db.authenticate().then(() => console.log('Database Connected...')).catch(err => console.log('Error' + err));


// app.use('/characters', require('./routes/characters'));
// //Server listener
// app.listen(PORT, console.log(`Server started on port ${PORT}`));
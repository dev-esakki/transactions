const express = require('express');
require('dotenv').config();
const Routes = require('./routes/index');
const db = require('./models');

const app = express();
app.use(
  express.json({
    limit: '5mb',
  }),
);
app.use(
  express.urlencoded({
    limit: '50mb',
    extended: true,
  }),
);
app.use(express.static(`${__dirname}/public`));

// Test the db connection
db.sequelize
  .authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err.original);
  });

process.on('unhandledRejection', (error) => {
  console.error(`unhandledRejection :: ${error}`);
});
// configure Routes
app.use(Routes);

app.use((req, res) => {
  res.header('Content-Type', 'application/json');
  res.status(404);
  res.send();
});

// set port, listen for request
app.listen(8080, () => {
  console.log(`Server is running on port 8080.`);
});

module.exports = app;

// Application initilzation

const express = require('express');
const bodyParser = require('body-parser');
const mongoDB = require('./db/mongodb');

// const swaggerAutogen = require('swagger-autogen')();
const port = process.env.PORT || 8080;

const professionalRoutes = require('./routes/professional');
const contactRoutes = require('./routes/contacts');
const docRoutes = require('./routes/swagger');
const app = express();

// Add swagger app.js
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');



app.use(bodyParser.json())
  .use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  // res.setHeader(
  //   'Access-Control-Allow-Headers',
  //   'Origin, X-Requested-With, Content-Type, Accept, Z-Key');
  // res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
})
  .use(bodyParser.urlencoded({ extended: true }))
  .use('/professional', professionalRoutes)  
  .use('/contacts', contactRoutes)

  // .use('/api-docs', docRoutes)
  .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


mongoDB.initDb((err, mongoDB) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Server started on Port ${port}. open frontend live server to view professional \n`);
    console.log(`ctrl+click http://localhost:${port}/professional`)
    console.log(`ctrl+click http://localhost:${port}/contacts`)
    console.log(`ctrl+click http://localhost:${port}/api-docs`)
  }
});
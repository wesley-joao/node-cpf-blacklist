const express = require('express');

const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const apiRoutes = require('./application/routes/apiRoutes.js');

app.use('/api/v1', apiRoutes);

app.listen(3000);

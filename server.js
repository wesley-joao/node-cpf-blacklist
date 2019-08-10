const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const path = require('path');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const apiRoutes = require('./application/routes/apiRoutes.js');
const applicationRoutes = require('./application/routes/applicationRoutes.js');

app.use('/', applicationRoutes);
app.use('/api/v1', apiRoutes);

/* Configurando ejs como view engine */
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'application/views'));
app.use(express.static(path.join(__dirname, 'application/public')));

app.listen(3000);

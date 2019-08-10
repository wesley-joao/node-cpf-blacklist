const express = require('express');

const router = express.Router();
const homeController = require('../controllers/application/index');
const statusController = require('../controllers/application/status');

router
  .get('/', homeController)
  .get('/status', statusController);

module.exports = router;

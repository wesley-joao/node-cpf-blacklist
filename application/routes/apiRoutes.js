const router = require('express').Router();
const cpfMiddleware = require('../middlewares/cpfMiddleware.js');
const blacklistController = require('../controllers/api/blacklist');

router
  .get('/cpf', blacklistController.findAll)
  .get('/cpf/:cpf', cpfMiddleware, blacklistController.findOne)
  .post('/cpf', cpfMiddleware, blacklistController.add)
  .delete('/cpf/:cpf', cpfMiddleware, blacklistController.delete);

module.exports = router;

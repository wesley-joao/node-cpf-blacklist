const router = require('express').Router();
const cpfMiddleware = require('../middlewares/cpfMiddleware.js');

const blacklistController = require('../controllers/api/blacklist');
const serverController = require('../controllers/api/server');

/**
 * @api {get} /cpf
 * @apiGroup CPF
 *
 * @apiSuccess {Array} cnpjs  cnpjs que constam na blacklist
 *
 * @apiSuccessExample {json} Sucesso
 *    HTTP/1.1 200 OK
 *    {
 *      "cpfs": [
 *          {
 *              "createdDate": "11/08/2019",
 *              "cpf": "103.832.220-01"
 *          },
 *          {
 *              "createdDate": "11/08/2019",
 *              "cpf": "261.142.240-00"
 *          }
 *      ]
 *  }
 *
 */
router.get('/cpf', blacklistController.findAll);

/**
 * @api {get} /cpf/{cpf}
 * @apiGroup CPF
 *
 * @apiSuccess {String} msg  mensagem de retorno
 *
 * @apiSuccessExample {json} Sucesso
 *    HTTP/1.1 200 OK
 *    {
 *      "msg": "CPF BLOCKED"
 *    }
 * @apiSuccessExample {json} Erro
 *    HTTP/1.1 404 NOT FOUND
 *    {
 *      "msg": "CPF FREE"
 *    }
 *
 */
router.get('/cpf/:cpf', cpfMiddleware, blacklistController.findOne);

/**
 * @api {post} /cpf/
 * @apiGroup CPF
 *
 * @apiParam (Request body) {String} cpf cpf para adicionar
 * @apiSuccess (Success 201) {String} msg  mensagem de retorno
 *
 * @apiSuccessExample {json} Sucesso
 *    HTTP/1.1 201 Created
 *    {
 *      "msg": "CPF Adicionado com sucesso na blacklist"
 *    }
 *
 * @apiSuccessExample {json} Erro
 *    HTTP/1.1 500 Internal server error
 *    {
 *      "msg": "CPF já está na blacklist"
 *    }
 *
 */
router.post('/cpf', cpfMiddleware, blacklistController.add);


/**
 * @api {delete} /cpf/{cpf}
 * @apiGroup CPF
 *
 * @apiParam (Request body) {String} cpf CPF para deletar
 * @apiSuccess {String} msg  mensagem de retorno
 *
 * @apiSuccessExample {json} Sucesso
 *    HTTP/1.1 200 OK
 *    {
 *      "msg": "CPF removido com sucesso da blacklist"
 *    }
 * @apiSuccessExample {json} Erro
 *    HTTP/1.1 404 Not found
 *    {
 *      "msg": "CPF não se encontra na blacklist"
 *    }
 *
 */
router.delete('/cpf/:cpf', cpfMiddleware, blacklistController.delete);

/**
 * @api {get} /status
 * @apiGroup STATUS
 *
 * @apiSuccess {String} uptime  tempo de execução do servidor
 * @apiSuccess {String} memoryUsed:total  memória total alocada
 * @apiSuccess {String} memoryUsed:used  memória utilizada
 * @apiSuccess {String} queriesExecuted  número de consultas executadas
 * @apiSuccess {String} cpfsOnBlacklist  número de cpfs na blacklist
 *
 * @apiSuccessExample {json} Sucesso
 *  HTTP/1.1 200 OK
 *  {
 *      "uptime": "0 horas 0 minutos e 31 segundos",
 *      "memoryUsed": {
 *          "total": "17.75 MB",
 *          "used": "12.85 MB"
 *      },
 *      "queriesExecuted": 0,
 *      "cpfsOnBlacklist": 2
 *  }
 */
router.get('/status', serverController.getStatus);

module.exports = router;

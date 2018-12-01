var express = require('express');
var router = express.Router();

var FPController = require('../controllers/FuncionarioPublicoController');

//CREATE (post)
router.post('/',FPController.create);

//READ TODOS
router.get('/', FPController.getAll);
//READ1
router.get('/:id', FPController.get);
//UPDATE
router.put('/:id', FPController.update);
//DELETE
router.delete('/:id', FPController.delete);

module.exports = router;
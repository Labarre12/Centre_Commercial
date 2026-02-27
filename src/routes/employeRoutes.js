const express = require('express');
const router = express.Router();
const employeController = require('../controllers/EmployeController');

router.put('/:idEmploye', employeController.updateEmploye);
router.delete('/:idEmploye', employeController.deleteEmploye);

module.exports = router;

const express = require('express');
const router = express.Router();
const controller = require('../controllers/admin/boutiqueController');

router.post('/', controller.createBoutique);
router.get('/', controller.getAllBoutiques);
router.get('/open', controller.getOpenBoutiques);
router.get('/closed', controller.getClosedBoutiques);
router.get('/categorie/:idCategorie', controller.getByCategorie);
router.put('/:id', controller.updateBoutique);
router.delete('/:id', controller.deleteBoutique);

router.get('/loyer/paye', controller.getBoutiquesQuiOntPaye);
router.get('/loyer/non-paye', controller.getBoutiquesNonPaye);


module.exports = router;

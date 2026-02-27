const express = require('express');
const router = express.Router();
const controller = require('../../controllers/admin/parkingController');

router.get('/', controller.getAllParkings);                              // Lister les parkings
router.post('/reservations', controller.createReservation);         // Réserver un parking
router.get('/reservations', controller.getAllReservations);         // Lister toutes les réservations
router.get('/reservations/:id', controller.getReservationById);     // Voir une réservation
router.put('/reservations/:id', controller.updateReservation);      // Mettre à jour une réservation

router.delete('/reservations/:id', controller.deleteReservation);
router.delete('/:id', controller.deleteParking);

module.exports = router;

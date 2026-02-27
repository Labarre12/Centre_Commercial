const Reservation = require('../../models/Reservation_parking');
const Parking = require('../../models/Parking');

// Lister tous les parkings
exports.getAllParkings = async (req, res) => {
  try {
    const parkings = await Parking.find().sort({ idParking: 1 });
    res.json(parkings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Réserver un parking
exports.createReservation = async (req, res) => {
  try {
    const reservation = new Reservation(req.body);
    await reservation.save();
    res.status(201).json(reservation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Lister toutes les réservations avec filtre
exports.getAllReservations = async (req, res) => {
  try {
    const { idParking, reservateur, dateDebut, dateFin } = req.query;
    let filter = {};

    if (idParking) filter.idparking = idParking;
    if (reservateur) filter.reservateur = reservateur;
    
    if (dateDebut || dateFin) {
      filter.createdAt = {};
      if (dateDebut) filter.createdAt.$gte = new Date(dateDebut);
      if (dateFin) filter.createdAt.$lte = new Date(dateFin);
    }

    const reservations = await Reservation.find(filter);
    res.json(reservations);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Voir une réservation spécifique
exports.getReservationById = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);
    if (!reservation) {
      return res.status(404).json({ message: "Réservation introuvable" });
    }
    res.json(reservation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Mettre à jour une réservation
exports.updateReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(reservation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Supprimer une réservation
exports.deleteReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findByIdAndDelete(req.params.id);
    if (!reservation) {
      return res.status(404).json({ message: "Réservation introuvable" });
    }
    res.json({ message: "Réservation supprimée avec succès" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Supprimer un parking
exports.deleteParking = async (req, res) => {
  try {
    const parking = await Parking.findByIdAndDelete(req.params.id);
    if (!parking) {
      return res.status(404).json({ message: "Parking introuvable" });
    }

    // Supprimer automatiquement toutes les réservations liées à ce parking
    await Reservation.deleteMany({ idparking: parking.idParking });

    res.json({ message: "Parking et ses réservations supprimés avec succès" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


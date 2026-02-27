const PlaceParking = require('../../models/PlaceParking');

// GET /api/parking — toutes les places groupées par secteur
exports.getParking = async (req, res) => {
  try {
    const spots = await PlaceParking.find().sort({ secteur: 1, numero: 1 });
    res.status(200).json(spots);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/parking/stats — résumé rapide
exports.getParkingStats = async (req, res) => {
  try {
    const total = await PlaceParking.countDocuments();
    const disponible = await PlaceParking.countDocuments({ disponible: true });
    res.status(200).json({ total, disponible, occupe: total - disponible });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

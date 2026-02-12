const mongoose = require('mongoose');
const Counter = require('./Counter');

const userSchema = new mongoose.Schema({
    idreservation: {
    type: String,
    unique: true,
  },
  idproduit: {
    type: String,
    required: true,
  },
  quantite: {
    type: Number,
    required: true,
  },
  idAcheteur: {
    type: String,
    required: true,
  },
  idstatus: {
    type: String,
    required: true,
  }
}, {
  timestamps: true
});

userSchema.pre("save", async function(next) {
  if (!this.idreservation) {

    const counter = await Counter.findOneAndUpdate(
      { name: "reservation_produit" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    this.idreservation = "RESERV" + counter.seq.toString().padStart(3, "0");
  }

  next();
})

module.exports = mongoose.model('Reservation_produit', userSchema);
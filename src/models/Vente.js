const mongoose = require('mongoose');
const Counter = require('./Counter');

const userSchema = new mongoose.Schema({
  idVente: {
    type: String,
    unique: true,
  },
  idBoutique: {
    type: String,
    required: true,
  },
  idProduit: {
    type: String,
    required: true,
  },
  quantite: {
    type: Number,
    required: true,
  },
  prix: {
    type: Number,
    required: true,
  },
  idAcheteur: {
    type: String,
    required: true,
  }
}, {
  timestamps: true
});

userSchema.pre("save", async function() {
  if (!this.idVente) {

    const counter = await Counter.findOneAndUpdate(
      { name: "vente" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    this.idVente = "VENTE" + counter.seq.toString().padStart(3, "0");
  }

})

module.exports = mongoose.model('Vente', userSchema);
const mongoose = require('mongoose');
const Counter = require('./Counter');


const userSchema = new mongoose.Schema({
    idCouleur: {
    type: String,
    unique: true,
  },
  libelle: {
    type: String,
    required: true,
  }
}, {
  timestamps: true
});

userSchema.pre("save", async function() {
  if (!this.idCouleur) {

    const counter = await Counter.findOneAndUpdate(
      { name: "couleur" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    this.idCouleur = "COULEUR" + counter.seq.toString().padStart(3, "0");
  }

})


module.exports = mongoose.model('Couleur', userSchema);
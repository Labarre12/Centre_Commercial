const mongoose = require('mongoose');
const Counter = require('./Counter');


const userSchema = new mongoose.Schema({
    idevenement: {
    type: String,
    unique: true,
  },
  libelle: {
    type: String,
    required: true,
  },
  dateDebut: {
    type: Date,
    required: true,
  },
  dateFin: {
    type: Date,
    required: true,
  },
  cible: {
    type: String,
    required: true,
  },
  idStatus: {
    type: String,
    required: true,
  }
}, {
  timestamps: true
});

userSchema.pre("save", async function() {
  if (!this.idevenement) {

    const counter = await Counter.findOneAndUpdate(
      { name: "evenement" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    this.idevenement = "EVENT" + counter.seq.toString().padStart(3, "0");
  }

})

module.exports = mongoose.model('Evenement', userSchema);
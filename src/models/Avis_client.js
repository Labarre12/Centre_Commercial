const mongoose = require('mongoose');
const Counter = require('./Counter');


const userSchema = new mongoose.Schema({
    idAvis: {
    type: String,
    unique: true,
    sparse: true,
  },
  idboutique: {
    type: String,
  },
  idProduit: {
    type: String,
  },
  idAcheteur: {
    type: String,
  },
  commentaire: {
    type: String,
  },
  note: {
    type: Number,
  },
  avis: {
    type: String,
  },
  notation: {
    type: Number,
  },
  date: {
    type: Date,
    default: Date.now,
  }
}, {
  timestamps: true
});

userSchema.pre("save", async function(next) {
  if (!this.idAvis) {

    const counter = await Counter.findOneAndUpdate(
      { name: "avis_client" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    this.idAvis = "AVIS" + counter.seq.toString().padStart(3, "0");
  }

  next();
})


module.exports = mongoose.model('Avis_client', userSchema);
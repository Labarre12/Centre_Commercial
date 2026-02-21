const mongoose = require('mongoose');
const Counter = require('./Counter');


const userSchema = new mongoose.Schema({
    idAvis: {
    type: String,
    unique: true,

  },
  idboutique: {
    type: String,
    required: true,
  },
  idAcheteur: {
    type: String,
    required: true,
  },
  avis: {
    type: String,
    required: true,
  },
  notation: {
    type: Number,
    required: true,
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
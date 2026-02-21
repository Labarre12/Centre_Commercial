const mongoose = require('mongoose');
const Counter = require('./Counter');

const userSchema = new mongoose.Schema({
  idParking: {
    type: String,
    unique: true,
  },
  libelle: {
    type: String,
    required: true,
    unique: true,
  }
}, {
  timestamps: true
});

userSchema.pre("save", async function(next) {
  if (!this.idParking) {

    const counter = await Counter.findOneAndUpdate(
      { name: "parking" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    this.idParking = "PARK" + counter.seq.toString().padStart(3, "0");
  }

  next();
})

module.exports = mongoose.model('Parking', userSchema);
const mongoose = require('mongoose');
const Counter = require('./Counter');


const userSchema = new mongoose.Schema({
  idEmplacement: {
    type: String,
    unique: true,
  },
  numero: {
    type: String,
    required: true,
    unique: true,
  }
}, {
  timestamps: true
});

userSchema.pre("save", async function() {
  if (!this.idEmplacement) {

    const counter = await Counter.findOneAndUpdate(
      { name: "emplacement" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    this.idEmplacement = "BOX" + counter.seq.toString().padStart(3, "0");
  }

})

module.exports = mongoose.model('Emplacement', userSchema);
const mongoose = require('mongoose');
const Counter = require('./Counter');


const userSchema = new mongoose.Schema({
  idLBE: {
    type: String,
    unique: true,
  },
  idboutique: {
    type: String,
    required: true,
  },
  idEmplacement: {
    type: String,
    required: true,
   } 
}, {
  timestamps: true
});

userSchema.pre("save", async function() {
  if (!this.idLBE) {

    const counter = await Counter.findOneAndUpdate(
      { name: "liaison_boutique" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    this.idLBE = "LBE" + counter.seq.toString().padStart(3, "0");
  }

})

module.exports = mongoose.model('Liaison_boutique_emplacement', userSchema);
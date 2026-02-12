const mongoose = require('mongoose');
const Counter = require('./Counter');

const userSchema = new mongoose.Schema({
    idparticipation: {
    type: String,
    unique: true,
  },
  idevenement: {
    type: String,
    required: true,
  },
  idboutique: {
    type: String,
    required: true,
  }
}, {
  timestamps: true
});

userSchema.pre("save", async function(next) {
  if (!this.idparticipation) {

    const counter = await Counter.findOneAndUpdate(
      { name: "participation" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    this.idparticipation = "PART" + counter.seq.toString().padStart(3, "0");
  }

  next();
})

module.exports = mongoose.model('Participation_boutique', userSchema);
const mongoose = require('mongoose');
const Counter = require('./Counter');


const userSchema = new mongoose.Schema({
  idReservationP: {
    type: String,
    unique: true,
  },
  idparking: {
    type: String,
    required: true,
  },
  reservateur: {
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
  if (!this.idReservationP) {

    const counter = await Counter.findOneAndUpdate(
      { name: "reservation_parking" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    this.idReservationP = "RPARK" + counter.seq.toString().padStart(3, "0");
  }

})

module.exports = mongoose.model('Reservation_parking', userSchema);
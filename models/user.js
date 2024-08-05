const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
  NAME: String,
  title: String,
  date: Date,
  date2: Date,
  notes: String,
  status: {
    type: String,
    enum: ['Bahrain', 'Kuwait', 'Oman']
  }
}, { timestamps: true })

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  trips: [tripSchema]
});

const User = mongoose.model('User', userSchema);

module.exports = User;
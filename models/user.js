const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const UserSchema = Schema ({
  name: String,
  lastname: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
  isAdmin: {
    type: Boolean,
    default: false,
  },
  status: {
    type: String,
    enum: ['Pending', 'Active', 'Inactive'],
    default: 'Pending',
  },
  confirmationCode: {
    type: String,
    unique: true,
  },
  avatar: String,
});

module.exports = mongoose.model ('User', UserSchema);

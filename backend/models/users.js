const mongoose = require('mongoose');
const { collection } = require('./car');

const usersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
 email: {
    type: String,
    required: true,
    unique: true,
    match: /.+\@.+\..+/,
  }, 
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },

}, {collection:'register'},);

module.exports = mongoose.model('Users', usersSchema);

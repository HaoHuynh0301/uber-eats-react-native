const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, default: '', required: true, unique: true},
  password: { type: String, default: '', required: true},    
}, { collection: 'user' });
const model = mongoose.model('UserSchema', UserSchema);

module.exports = model;

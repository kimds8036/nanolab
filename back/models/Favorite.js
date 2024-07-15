const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const favoriteSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  notice_id: {
    type: Schema.Types.ObjectId,
    ref: 'Notice',
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

const Favorite = mongoose.model('Favorite', favoriteSchema);

module.exports = Favorite;

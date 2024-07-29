const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recentViewSchema = new Schema({
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
  viewed_at: {
    type: Date,
    default: Date.now
  }
});

const RecentView = mongoose.model('RecentView', recentViewSchema);

module.exports = RecentView;

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const answersSchema = new Schema({
  content: String,
  question: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question'
  }
}, {timestamps: true});

const Answer = mongoose.model('Answer', answersSchema);

module.exports = Answer;
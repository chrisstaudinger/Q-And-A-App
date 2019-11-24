const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionsSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: String,
  answers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Answer'
  }]
}, {timestamps: true});

const Question = mongoose.model('Question', questionsSchema);

module.exports = Question;
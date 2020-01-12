const Question = require('../models/Question');
const Answer = require('../models/Answer')

// retrieve all questions
const index = async (req, res) => {
  try {
    const questions = await Question.find()
    res.send(questions)
  } catch (error) {
    res.status(500).send()
  }
}

// get a specific question
const show = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id, (err, question) => {})
    .populate('answers')
    res.send(question)
  } catch (error) {
    if (question.length > 1) return res.status(500).send()
    if (question.length === 0) return res.status(404).send()
  }
}

// insert a new question
const create = async (req, res) => {
  try {
    const { title, description, userId } = req.body
    const newQuestion = new Question({
      title,
      description,
      userId
    })
    const savedQuestion = await newQuestion.save()
    res.send(savedQuestion)
  } catch (error) {
    res.status(500).send()
  }
}

// Delete a question
const destroy = async (req, res) => {
  try {
    const deletedQuestion = await Question.findByIdAndDelete(req.params.id, (err, question) => {})
    res.send(deletedQuestion)
  } catch (error) {
    res.status(500).send()
  }
}

module.exports = {
  index,
  show,
  create,
  destroy
}
const Question = require('../models/Question');
const Answer = require('../models/Answer')

// Insert a new answer to a question
const create = async (req, res) => {
  try {
    const { answer, userId } = req.body;
    const question = await Question.findById(req.params.id, (err, question) => {})
    console.log(question)
    const newAnswer = new Answer({
      content: answer,
      question: question._id,
      userId
    })
    console.log(newAnswer)
    const savedAnswer = await newAnswer.save()
    question.answers.push(savedAnswer)
    const updatedQuestion = await question.save()
    console.log(question)
    res.send(savedAnswer)
  } catch (error) {
    console.log(error)
    res.status(500).send()
  }
}

// Delete an answer to a question
const destroy = async (req, res) => {
  try {
    const answer = await Answer.findById(req.params.id, (err, answer) => {})
    const question = await Question.findById(answer.question, (err, question) => {})
    const questionAnswers = question.answers
    const questionAnswersAnswerIndex = questionAnswers.indexOf(answer._id)
    questionAnswers.splice(questionAnswersAnswerIndex, 1)
    await Question.findByIdAndUpdate(question._id, {answers: questionAnswers}, (err, question) => {})
    const deletedAnswer = await Answer.findByIdAndDelete(req.params.id, (err, answer) => {})
    res.send(deletedAnswer)
  } catch (error) {
    res.status(500).send()
  }
}

// Update an answer to a question
const update = async (req, res) => {
  try {
    const { content } = req.body;
    console.log(content)
    const updatedAnswer = await Answer.findByIdAndUpdate(req.params.id, {content}, {new: true}, (err, answer) => {})
    console.log(updatedAnswer)
    res.send(updatedAnswer)
  } catch (error) {
    res.status(500).send()
  }
}


module.exports = {
  create,
  update,
  destroy
}
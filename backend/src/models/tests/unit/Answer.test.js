const mongoose = require('mongoose')
const Answer = require('../../Answer')
const Question = require('../../Question')
const testDBURL = 'mongodb://127.0.0.1:27017/qa-app'

const connectDB = async () => {
  try {
    await mongoose.connect(testDBURL)  
  } catch (error) {
    console.log(error)
  }
}

describe('Question Model', () => {
  it('Question model exist', () => {
    expect(Question).toBeDefined()
  })
})

describe('Answer Model', () => {
  beforeEach(async () => {
    await connectDB()
    await Answer.deleteMany({})
  })

  afterEach(async () => {
    await Answer.deleteMany({})
    await mongoose.connection.close()
  })

  it('Answer model exist', () => {
    expect(Answer).toBeDefined()
  })

  describe('save an answer', () => {
    it('saves an answer', async () => {
      const newAnswer = await Answer.create({
        content: 'This is a test answer. Am I working?',
        question: mongoose.Types.ObjectId(),
        userId: 'google-oauth2|111937416803417932837000'
      })
      const savedAnswer = await Answer.find()
      expect(savedAnswer).toBeDefined()
      expect(typeof savedAnswer).toBe('object')
    })
  })

  describe('update an answer', () => {
    it('updates an answer to a question', async () => {
      const newAnswer = await Answer.create({
        content: 'This is a test answer. Am I working?',
        question: mongoose.Types.ObjectId(),
        userId: 'google-oauth2|111937416803417932837000'
      })
      const content = {content: 'This is a test answer. Am I working?'}
      const update = {content: 'This is an UPDATED answer!'}
      await Answer.findOneAndUpdate(content, update)
      const updatedAnswer = await Answer.findOne()
      expect(typeof updatedAnswer).toBe('object')
      expect(updatedAnswer.content).toEqual(update.content)
    })
  })

  describe('delete an answer', () => {
    it('deletes an answer', async () => {
      const newAnswer = await Answer.create({
        content: 'This is a test answer. Am I working?',
        question: mongoose.Types.ObjectId(),
        userId: 'google-oauth2|111937416803417932837000'
      })
      const content = {content: 'This is a test answer. Am I working?'}
      const deletedAnswer = await Answer.findOneAndDelete(content)
      expect(typeof deletedAnswer).toBe('object')
      expect(deletedAnswer).not.toBeNull()
    })
  })
})

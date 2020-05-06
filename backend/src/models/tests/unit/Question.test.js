const mongoose = require('mongoose')
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
  beforeEach(async () => {
    await connectDB()
    await Question.deleteMany({})
  })

  afterEach(async () => {
    await Question.deleteMany({})
    await mongoose.connection.close()
  })
  
  it('Has a module', () => {
    expect(Question).toBeDefined()
  })

  describe('save a question', () => {
    it('saves a question', async () => {
      const newQuestion = await Question.create({
        title: 'What is React?',
        description: 'Can someone provide a fairy detailed overview of what React is? 🤔',
        answers: [],
        userId: 'google-oauth2|111937416803417932837000'
      })
      const savedQuestion = await Question.findOne({title: 'What is React?'})
      expect(typeof savedQuestion).toBe('object')
      expect(savedQuestion).not.toBeNull()
      expect(savedQuestion.title).toBe(newQuestion.title)
    })
  })

  describe('get a question', () => {
    it('gets a question', async () => {
      const newQuestion = await Question.create({
        title: 'Why is Testing Important?',
        description: 'People are always talking about TDD. What\'s all the fuss about?',
        answers: [],
        userId: 'google-oauth2|11193741680341793283700000'
      })
      const savedQuestion = await Question.findOne({title: 'Why is Testing Important?'})
      expect(typeof savedQuestion).toBe('object')
      expect(savedQuestion).not.toBeNull()
      expect(savedQuestion.title).toBe(newQuestion.title)
    })
  })

  describe('update a question', () => {
    it('updates a question', async () => {
      const newQuestion = await Question.create({
        title: 'What is Docker?',
        description: '',
        answers: [],
        userId: 'google-oauth2|11193741680341793283700000'
      })
      const savedQuestion = await Question.findOne({title: 'What is Docker?'})
      const title = {title: savedQuestion.title}
      const update = {title: "Why Is Docker So Popular"}
      await Question.findOneAndUpdate(title, update)
      const updatedQuestion = await Question.findOne(update)
      expect(typeof updatedQuestion).toBe('object')
      expect(updatedQuestion).not.toBeNull()
      expect(updatedQuestion.title).toBe(update.title)
    })
  })
  
  describe('delete a question', () => {
    it('deletes a question', async () => {
      const newQuestion = await Question.create({
        title: 'How does authenitication work?',
        description: 'If someone can provide a simplistic overview would be great 🙏',
        answers: [],
        userId: 'google-oauth2|11193741680341793283700000'
      })
      const savedQuestion = await Question.deleteOne({title: 'How does authenitication work?'})
      expect(savedQuestion.ok).toBe(1)
    })
  })
})

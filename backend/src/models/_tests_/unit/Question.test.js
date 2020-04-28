const mongoose = require('mongoose')
const Question = require('../../Question')
const DBURL = 'mongodb://127.0.0.1:27017/qa-app'

try {
  mongoose.connect(DBURL)  
} catch (error) {
  console.log(error)
}


describe('Question Model', () => {
  beforeAll(async () => {
    await Question.deleteMany({})
  })

  afterEach(async () => {
    await Question.deleteMany({})
  })
  
  afterAll(async () => {
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
      expect(savedQuestion).toBeDefined()
      expect(savedQuestion.title).toBe('Why is Testing Important?')
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
      expect(updatedQuestion).toBeDefined()
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

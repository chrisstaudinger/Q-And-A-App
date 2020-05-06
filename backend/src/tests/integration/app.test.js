const request = require('supertest')
const app = require('../../app')
const mongoose = require('mongoose')
const Question = require('../../models/Question')
const testDBURL = 'mongodb://127.0.0.1:27017/qa-app'

const connectDB = async () => {
  try {
    await mongoose.connect(testDBURL)  
  } catch (error) {
    console.log(error)
  }
}

describe('GET questions', () => {
  beforeEach(async () => {
    connectDB()
    await Question.create({
      title: 'What is React?',
      description: 'Can someone provide a fairy detailed overview of what React is? 🤔',
      answers: [],
      userId: 'google-oauth2|111937416803417932837000'
    })
  })

  afterEach(async () => {
    await Question.deleteMany({})
    mongoose.connection.close()
  })

  it('responds with JSON', async () => {
  const res = await request(app)
    .get('/')
  expect(res.statusCode).toEqual(200)
  expect(res.body[0]).toHaveProperty('title')
  })
})
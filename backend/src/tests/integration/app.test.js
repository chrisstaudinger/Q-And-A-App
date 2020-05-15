// jest.mock('../../middleware/auth-middleware', () => jest.fn((req, res, next) => next()))

const request = require('supertest')
const app = require('../../app')
const mongoose = require('mongoose')
const Question = require('../../models/Question')
// const { checkJwt } = require('../../middleware/auth-middleware')
const testDBURL = 'mongodb://127.0.0.1:27017/qa-app'

const connectDB = async () => {
  try {
    await mongoose.connect(testDBURL)  
  } catch (error) {
    console.log(error)
  }
}
 
const question = {
  title: 'What is React?',
  description: 'Can someone provide a fairy detailed overview of what React is? 🤔',
  answers: [],
  userId: 'google-oauth2|111937416803417932837000'
}

describe('GET "/" (questions)', () => {
  beforeEach(async () => {
    connectDB()
    await Question.create(question)
  })
  
  afterEach(async () => {
    await Question.deleteMany({})
    await mongoose.connection.close()
  })
  
  it('responds with JSON data', async () => {
    const res = await request(app)
    .get('/')
    .expect('Content-Type', /json/)
    expect(res.status).toEqual(200)
    expect(res.body[0]).toHaveProperty('title')
  })
})

describe('GET "/:id" (1 question)', () => {
  beforeEach(async () => {
    await connectDB()
    await Question.create(question)
  })

  afterEach(async () => {
    await Question.deleteMany({})
    await mongoose.connection.close()
  })

  it('responds with specified question as JSON data', async () => {
    const retrievedQuestion = await Question.findOne({title: question.title})
    const res = await request(app)
      .get(`/${retrievedQuestion._id}`)
      .expect('Content-Type', /json/)
    expect(res.status).toEqual(200)
    expect(res.body).toHaveProperty('title')
  })
})

// describe('POST "/" (create 1 question)', () => {
  // beforeEach(async () => {
  //   await connectDB()
  // })

  // afterEach(async () => {
  //   await Question.deleteMany({})
  //   await mongoose.connection.close()
  // })

  // it('responds with specified question as JSON data', (done) => {
  //   request(app)
  //     .post('/')
  //     // .set('Authorization','Bearer '+ 'authToken')
  //     .send(question)
  //     .set('Accept', 'application/json')
  //     .expect('Content-Type', /json/)
  //     .expect(200)
  //     .end(function(err, res) {
  //       if (err) return done(err);
  //       done();
  //     })
  // })
// })
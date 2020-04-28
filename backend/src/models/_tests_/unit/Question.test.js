const mongoose = require('mongoose')
const Question = require('../../Question')
const DBURL = 'mongodb://127.0.0.1:27017/qa-app'

mongoose.connect(DBURL)

describe('User Model', () => {
  beforeAll(async () => {
    Question.remove({})
  })

  afterEach(async () => {
    Question.remove({})
  })

  it('Has a module', () => {
    expect(Question).toBeDefined()
  })
})

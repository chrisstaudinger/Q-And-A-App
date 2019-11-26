const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
const Question = require('./models/Question')
const Answer = require('./models/Answer')

// define the Express app
const app = express();

// the database
const questions = [];

// enhance your app security with Helmet
app.use(helmet());

// use bodyParser to parse application/json content-type
app.use(bodyParser.json());

// enable all CORS requests
app.use(cors());

// log HTTP requests
app.use(morgan('dev'));

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://dev-t3f5y7r6.au.auth0.com/.well-known/jwks.json`
  }),

  // Validate the audience and the issuer.
  audience: 'rvWgSnXWdasN5GdsbeYZ9vCHzd0cmowG',
  issuer: `https://dev-t3f5y7r6.au.auth0.com/`,
  algorithms: ['RS256']
});

// require all routes
app.use(require('./routes'))

// retrieve all questions
// app.get('/', (req, res) => {
//   const qs = questions.map(q => ({
//     id: q.id,
//     title: q.title,
//     description: q.description,
//     answers: q.answers.length,
//   }));
//   res.send(qs);
// });

// retrieve all questions
app.get('/', async (req, res) => {
  try {
    const questions = await Question.find()
    res.send(questions)
  } catch (error) {
    res.status(500).send()
  }
})

// get a specific question
// app.get('/:id', (req, res) => {
//   const question = questions.filter(q => (q.id === parseInt(req.params.id)));
//   if (question.length > 1) return res.status(500).send();
//   if (question.length === 0) return res.status(404).send();
//   res.send(question[0]);
// });

// get a specific question
app.get('/:id', async (req, res) => {
  try {
    const question = await Question.findById(req.params.id, (err, question) => {})
      .populate('answers')
    console.log(question)
    res.send(question)
  } catch (error) {
    if (question.length > 1) return res.status(500).send()
    if (question.length === 0) return res.status(404).send()
  }
})

// insert a new question
// app.post('/', checkJwt, (req, res) => {
//   const {title, description} = req.body;
//   const newQuestion = {
//     id: questions.length + 1,
//     title,
//     description,
//     answers: [],
//   };
//   questions.push(newQuestion);
//   res.status(200).send();
// });

// insert a new question
app.post('/', checkJwt, async (req, res) => {
  try {
    const { title, description } = req.body
    const newQuestion = new Question({
      title,
      description
    })
    const savedQuestion = await newQuestion.save()
    res.send(savedQuestion)
  } catch (error) {
    res.status(500).send()
  }
})

// insert a new answer to a question
// app.post('/answer/:id', checkJwt, (req, res) => {
//   const {answer} = req.body;

//   const question = questions.filter(q => (q._id === parseInt(req.params.id)));
//   if (question.length > 1) return res.status(500).send();
//   if (question.length === 0) return res.status(404).send();

//   question[0].answers.push({
//     answer,
//   });

//   res.status(200).send();
// });

// Insert a new answer to a question
app.post('/answer/:id', checkJwt, async (req, res) => {
  try {
    const { answer } = req.body;
    // console.log(answer, req.params.id)
    const question = await Question.findById(req.params.id, (err, question) => {})
    // console.log(question)
    const newAnswer = new Answer({
      content: answer,
      question: question._id
    })

    const savedAnswer = await newAnswer.save()
    question.answers.push(savedAnswer)
    const updatedQuestion = await question.save()
    console.log(question)
    res.send(savedAnswer)
  } catch (error) {
    res.status(500).send()
  }
})

module.exports = app


// What is React?
// Can someone provide a fairy detailed overview of what React is? 🤔

// Why is Testing Important?
// People are always talking about TDD. What's all the fuzz about?
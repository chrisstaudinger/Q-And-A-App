const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

// define the Express app
const app = express();

// enhance your app security with Helmet
app.use(helmet());

// use bodyParser to parse application/json content-type
app.use(bodyParser.json());

// enable all CORS requests
app.use(cors());

// log HTTP requests
app.use(morgan('dev'));

// require all routes
app.use(require('./routes'))

module.exports = app


// What is React?
// Can someone provide a fairy detailed overview of what React is? 🤔
// React is a JavaScript library for building user interfaces. It is maintained by Facebook and a community of individual developers and companies. React can be used as a base in the development of single-page or mobile applications, as it is optimal for fetching rapidly changing data that needs to be recorded

// Why is Testing Important?
// People are always talking about TDD. What's all the fuss about?
// Code testing is important because it helps you find bugs easily.
// Even the methods that look like the most simple ones sometimes don’t work beacuse of an annoying little bug.
// Imagine that you have a system with hundreds of methods, and suddenly a bug appears.
// Now you need to track it’s origin and fix it.
// This might take a while…Code testing, and unit testing in particular - are meant to prevent this exact problem.

// Are class components in React going to become deprecated now that there are context and hooks APIs?
// Good question. It will be interesting to see how it plays out. Bit too early to tell at this point.

// What is Docker?
// Docker is a tool designed to make it easier to create, deploy, and run applications by using containers. Containers allow a developer to package up an application with all of the parts it needs, such as libraries and other dependencies, and ship it all out as one package

// Should I build my application using GraphQL or RESTAPI?

// What is Apollo?

// Should I use redux or context in my App?
// I am building a weather api, would it be better to use redux or context and hooks?

// Can someone explain Mocking with Jest?

// How does authenitication work?
// If someone can provide a simplistic overview would be great 🙏

// Passport or Auth0?
// For javascript side-projects, do people prefer Passport or Auth0?

// What is a 418 HTTP Status Code?

// Why use a UI Kit?
// When and why should you use a UI Kit for a project?
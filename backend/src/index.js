const mongoose = require('mongoose');
const app = require('./server')

mongoose.set('useCreateIndex', true);
require('dotenv').config();
const PORT = process.env.PORT || 5000


const connectDB = async () => {
  const dbOptions = { useNewUrlParser: true, useUnifiedTopology: true }
  await mongoose.connect(process.env.DB_URL, dbOptions, (err) => {
    if (err) {
      console.log('not connected ❌')
    } else {
      console.log('connected ✅')
    }
  })
}
connectDB()

const runServer = () => {
  try {
    app.listen(PORT, () => console.log(`listening on port ${PORT} 👍`))
  } catch (error) {
    return error
  }
}
runServer()

module.exports = { connectDB, runServer }
const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
require('dotenv').config();
const PORT = process.env.PORT || 5000


// mongoose
const dbOptions = { useNewUrlParser: true, useUnifiedTopology: true }
mongoose.connect(process.env.DB_URL, dbOptions, (err) => {
  if (err) {
    console.log('not connected ❌')
  } else {
    console.log('connected ✅')
  }
})

const app = require('./app')
app.listen(PORT, () => console.log(`listening on port ${PORT} 👍`))
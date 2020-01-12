const mongoose = require('mongoose');
const app = require('./server')

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

app.listen(PORT, () => console.log(`listening on port ${PORT} 👍`))
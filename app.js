const express = require('express')
const app = express()

require('dotenv').config()

const connectDB = require('./db/connect')

//middlewares
app.use( express.json() )
app.use( helmet() )

app.get('/', (_req, res) => {
    res.send('<h1>Jobs API</h1>')
})

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error)
  }
};

start()
const express = require('express')
const connectDB = require('./db/connect')
const app = express()

require('dotenv').config()

//routers
const jobsRouter = require('./routes/jobs.routes.js')
const authRouter = require('./routes/auth.routes.js')


//middlewares
const authenticateUser = require('./middlewares/auth.js')
app.use( helmet() )
app.use( express.json() )


app.get('/', (_req, res) => {
    res.send('<h1>Jobs API</h1>')
})

//routes
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/jobs', authenticateUser, jobsRouter)

const PORT = process.env.PORT || 5000

const start = async () => {

    try {
    
        await connectDB(process.env.MONGO_URI)
    
        app.listen(PORT, () =>
            console.log(`Server is listening on port ${PORT}...`)
        )

    } catch (error) {
        console.log(error)
    }

}

start()
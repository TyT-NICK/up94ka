const express = require('express')
const session = require('express-session')
const redis = require('redis')
const RedisStorage = require('connect-redis')(session)
const mongoose = require('mongoose')

const router = require('./router')
const messages = require('./messages')

const app = express()

const PORT = process.env.Port || 8080
const SECRET = process.env.Secret || 'default secret'
const REDIS_PORT = process.env.RedisPort || 6379
const DB_CONNECTION = process.env.DbConnection

const redisClient = redis.createClient({
  host: 'localhost',
  port: REDIS_PORT,
})

app.use(
  session({
    secret: SECRET,
    store: new RedisStorage({ client: redisClient }),
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: 12 * 60 * 60 * 1000 /* 12 hours */,
      signed: true,
    },
  })
)

app.use(express.json())

app.use('/', router)

app.use((error, req, res, next) => {
  console.error(req.baseUrl)
  console.error(error.message)
  console.error(error.stack)
  res.status(500).send(messages.innerServerError)
})

const connectionOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
}
mongoose.connect(DB_CONNECTION, connectionOptions, (error) => {
  if (error) {
    console.error(error.message)
  }
})

app.listen(PORT, () => {
  console.log(`server on http://127.0.0.1:${PORT}`)
})
